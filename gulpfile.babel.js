//https://medium.com/@andrewhenderson/es6-with-babel-6-gulp-and-rollup-aa7aeddeccc6
//https://github.com/gulpjs/gulp#use-latest-javascript-version-in-your-gulpfile
//
//  npm i -D  babel-core  gulp@next gulp-file gulp-sass  rollup rollup-plugin-node-resolve rollup-plugin-babel babel-preset-env babel-plugin-external-helpers
//
//Autoprefixer
//
//  npm i -D  postcss-cli autoprefixer
//
//For cleanup/minification:
//  npm i -D  gulp-strip-comments gulp-header gulp-uglify gulp-rename
//
//(Ignore warning "Failed to load external module @babel/register")
//https://github.com/gulpjs/gulp/issues/1631


import * as pkg from './package.json';

import gulp from 'gulp';
import file from 'gulp-file';
import sass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import pug  from 'pug';
import { rollup } from 'rollup';
import replace from 'rollup-plugin-replace';
import cleanup from 'rollup-plugin-cleanup';
//import * as babel from 'babel-core';
import babel from 'rollup-plugin-babel';
//If the code imports modules from /node_modules
import resolve from 'rollup-plugin-node-resolve';

//Cleanup & minification step:
//import replace from 'gulp-replace';
import strip  from 'gulp-strip-comments';
import header from 'gulp-header';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

//Documentation
import jsdoc from 'gulp-jsdoc3';

//Automatically build/reload on file changes:
import { spawn } from 'child_process';


const globalName = 'Picker',
      entry = 'src/index.js';

const myBanner = `/*!
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright 2017-<%= new Date().getFullYear() %> <%= pkg.author %>
 * Released under the <%= pkg.license %> license.
 */
`;


//https://github.com/cssmagic/gulp-stream-to-promise/blob/master/index.js
function stream2Promise(stream) {
	return new Promise(function(resolve, reject) {
		stream.on('finish', resolve)
		      //https://github.com/sindresorhus/gulp-size/issues/13
			  .on('end', resolve)
			  .on('error', reject);
	});
}

gulp.task('build', function(cb) {
    
    //Generate the JSDoc documentation:
    function generateDocs() {
        //Looks like stream2Promise() won't wait until the docs are built here
        //so we need to pass a callback to jsdoc()..
        return new Promise(function(resolve, reject) {
            //https://github.com/mlucool/gulp-jsdoc3#usage
            const config = require('./docs/jsdoc.json');
            gulp.src(['README.md', './src/**/*.js'], { read: false })
                .pipe(jsdoc(config, resolve));
        });
    }
    
    //Prepare the CSS and HTML we'll inline later:
    function prepareAssets() {
        //  //https://github.com/dlmanning/gulp-sass#basic-usage
        //  gulp.src(entry.replace('.js', '.scss'))
        //      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //  
        //      //https://stackoverflow.com/questions/41523743/can-i-convert-a-gulp-stream-into-a-string
        //      .on('data', function(cssStream) {
        //          const css = cssStream.contents.toString();
        //          //console.log(css);
    
        //Easier to use the normal node packages to create the HTML and CSS:
        const html = pug.renderFile(entry.replace('.js', '.pug'));
    
        const sassFile = entry.replace('.js', '.scss'),
              sassed = sass.renderSync({ file: sassFile, outputStyle: 'compressed' });
    
        return postcss([ autoprefixer ]).process(
            sassed.css.toString(),
            { from: sassFile }
        )
        .then(result => {
            result.warnings().forEach(warn => console.warn('CSS: ' + warn.toString()));
            return {
                html,
                css: result.css,
            };
        });
    }

    //Bundle everything into an ES6 module:
    function buildBundle(assets, csp) {
        //Keep these names the same as in package.json:
        const outBase = csp ? 'dist/vanilla-picker.csp' : 'dist/vanilla-picker',
              outModule = outBase + '.mjs',
              outUMD = outBase + '.js',
              outUMDMin = outBase + '.min.js';
        
        const css = assets.css.trim();

        const searchReplace = {
            '## PLACEHOLDER-HTML ##': assets.html,
        };
        //https://github.com/Sphinxxxx/vanilla-picker/issues/45
        if(csp) {
            searchReplace['## PLACEHOLDER-CSS-SECTION ##'] = '';
        }
        else {
            searchReplace['## PLACEHOLDER-CSS ##'] = css;
        }

        return rollup({
            input: entry,
            plugins: [
                resolve({
                    module: true,
                }),
                cleanup({
                    comments: 'none',
                    //compactComments: false,
                    maxEmptyLines: 1,
                }),
                replace({
                    include: '/**/*.js',
                    delimiters: ['', ''],
                    values: searchReplace,
                }),
                babel({
                    babelrc: false,
                    presets: [
                        ["env", { modules: false/*, loose: true*/ }]
                    ],
                    //We import ES6 modules (color-conversion)..
                    //  exclude: 'node_modules/**',

                    plugins: ["external-helpers"],
                }),
            ],
        })
        .then(bundle => {
            //Build ES module..
            return bundle.generate({
              format: 'esm',
            })
            .then(gen => {
                //https://rollupjs.org/guide/en/#rolluprollup
                const code = gen.output[0].code;
                return stream2Promise(
                    file(outModule, code, { src: true })
                        .pipe(header(myBanner, { pkg: pkg }))
                        .pipe(gulp.dest('.'))
                );
            })
            //..and a traditional UMD:
            .then(() => bundle.generate({
                format: 'umd',
                name: globalName,
            }))
            .then(es5 => stream2Promise(
                file(outUMD, es5.output[0].code, { src: true })

                    //Write un-minified:
                    .pipe(strip())
                    .pipe(header(myBanner, { pkg : pkg }))
                    .pipe(gulp.dest('.'))

                    //Minify:
                    //https://codehangar.io/concatenate-and-minify-javascript-with-gulp/
                    //https://stackoverflow.com/questions/32656647/gulp-bundle-then-minify
                    //(https://stackoverflow.com/questions/40609393/gulp-rename-illegal-operation)
                    .pipe(rename(outUMDMin))
                    .pipe(uglify())
                    .pipe(header(myBanner, { pkg: pkg }))
                    .pipe(gulp.dest('.'))
            ));
        })
        //Write separate CSS file for strict CSP settings:
        .then(() => {
            if(csp) {
                file(outBase + '.css', css, { src: true }).pipe(gulp.dest('.'))
            }
        });
    }
    
    return Promise.all([
        generateDocs(),
        prepareAssets().then(assets =>
            buildBundle(assets).then(() =>
            buildBundle(assets, true))
        )
    ]);

});


/* The rest of these tasks are only here to run 'build' automatically when files change */


//https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglobs-opts-fn
//https://css-tricks.com/gulp-for-beginners/
gulp.task('watch', function() {
    console.log('** Listening for file changes...');

    //Rebuild when anything in src/ changes:
    //https://stackoverflow.com/questions/27645103/how-to-gulp-watch-multiple-files
    const watcher = gulp.watch(['src/**/*.*'], gulp.parallel('build'));
    
    watcher.on('change', function(path, stats) {
      console.log('File ' + path + ' was changed');
    });
    watcher.on('unlink', function(path) {
      console.log('File ' + path + ' was removed');
    });
});


gulp.task('startup', gulp.series('build', 'watch'));


//In addition to listening for code changes, we also need to restart gulp whenever package.json or gulpfile.babel.js change
//https://stackoverflow.com/questions/22886682/how-can-gulp-be-restarted-upon-each-gulpfile-change
//https://gist.github.com/tilap/31167027ddee8acbf0e7
gulp.task('auto-reload', function() {
    let p;
    
    gulp.watch(['*.js*'], spawnChildren);
    spawnChildren();
    
    function spawnChildren(callback) {
        //Kill previous spawned process
        if(p) { p.kill(); }
        
        //`spawn` a child `gulp` process linked to the parent `stdio`
        p = spawn('gulp', ['startup'], { stdio: 'inherit' });

        //https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn-1
        if(callback) {
            console.log('package.json or gulpfile.babel.js changed, restarted..');
            callback();
        }
    }
});


gulp.task('default', gulp.series('auto-reload'));

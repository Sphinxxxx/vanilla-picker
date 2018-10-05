//https://medium.com/@andrewhenderson/es6-with-babel-6-gulp-and-rollup-aa7aeddeccc6
//https://github.com/gulpjs/gulp#use-latest-javascript-version-in-your-gulpfile
//
//  npm i -D  babel-core  gulp@next gulp-file gulp-sass  rollup rollup-plugin-node-resolve rollup-plugin-babel babel-preset-env babel-plugin-external-helpers
//
//For cleanup/minification:
//  npm i -D  gulp-strip-comments gulp-header gulp-uglify gulp-rename
//
//(Ignore warning "Failed to load external module @babel/register")
//https://github.com/gulpjs/gulp/issues/1631


import * as pkg from './package.json';

import gulp from 'gulp';
import file from 'gulp-file';
import sass from 'node-sass';
import pug  from 'pug';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
//If the code imports modules from /node_modules
import resolve from 'rollup-plugin-node-resolve';

//Cleanup & minification step:
import replace from 'gulp-replace';
import strip  from 'gulp-strip-comments';
import header from 'gulp-header';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

//Documentation
import jsdoc from 'gulp-jsdoc3';

//Automatically build/reload on file changes:
import { spawn } from 'child_process';


const globalName = 'Picker',
      entry = 'src/picker.js';

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
    /* First, inline the CSS and HTML to create a working ES6 module: */

    //  //https://github.com/dlmanning/gulp-sass#basic-usage
    //  gulp.src(entry.replace('.js', '.scss'))
    //      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //  
    //      //https://stackoverflow.com/questions/41523743/can-i-convert-a-gulp-stream-into-a-string
    //      .on('data', function(cssStream) {
    //          const css = cssStream.contents.toString();
    //          //console.log(css);

    //Easier to use the normal node packages to read the HTML and CSS we'll inline into the JS:
    const sassed = sass.renderSync({
        file: entry.replace('.js', '.scss'),
        outputStyle: 'compressed',
    });
    const css = sassed.css.toString(); //(Buffer.toString())

    const html = pug.renderFile(entry.replace('.js', '.pug'));

    return stream2Promise(
        //file(outFile + '.js', gen.code, { src: true })
        gulp.src(entry)
            .pipe(replace( '## PLACEHOLDER-CSS ##', css.trim() ))
            .pipe(replace( '## PLACEHOLDER-HTML ##', html ))
            .pipe(rename(pkg.module))
            .pipe(gulp.dest('.'))
    )
    
    /* Now, transpile to an ES5 library */

    .then(x => {
        return rollup({
            input: pkg.module,
            plugins: [
                resolve({
                    module: true,
                }),
                babel({
                    babelrc: false,
                    presets: [
                      ["env", { modules: false/*, loose: true*/ }]
                    ],
                    //We import ES6 modules (color-conversion and drag-tracker)..
                    //  exclude: 'node_modules/**',
    
                    plugins: ["external-helpers"],
                }),
            ],
        });
    })
    .then(bundle => {
        return bundle.generate({
          format: 'umd',
          name: globalName,
        });
    })
    .then(gen => {

        /* Generate the JSDoc documentation */

        //Looks like stream2Promise() won't wait until the docs are built here
        //so we need to pass a callback to jsdoc()..
        const promDocs = new Promise(function(resolve, reject) {
            //https://github.com/mlucool/gulp-jsdoc3#usage
            const config = require('./docs/jsdoc.json');
            gulp.src(['README.md', './src/**/*.js'], { read: false })
                .pipe(jsdoc(config, resolve));
        });
        
        /* Generate the /dist files */
        
        const promDist = stream2Promise(
            file(pkg.main, gen.code, { src: true })

                //Write un-minified:
                .pipe(strip())
                .pipe(header(myBanner, { pkg : pkg }))
                .pipe(gulp.dest('.'))
    
                //Minify:
                //https://codehangar.io/concatenate-and-minify-javascript-with-gulp/
                //https://stackoverflow.com/questions/32656647/gulp-bundle-then-minify
                //(https://stackoverflow.com/questions/40609393/gulp-rename-illegal-operation)
                .pipe(rename({ extname: '.min.js' }))
                .pipe(uglify())
                .pipe(header(myBanner, { pkg: pkg }))
                .pipe(gulp.dest('.'))
        );

        //console.log('returning dist');
        return Promise.all([promDocs, promDist]);
    });
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

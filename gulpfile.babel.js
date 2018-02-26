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


import gulp from 'gulp';
import file from 'gulp-file';
import sass from 'gulp-sass';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
//If the code imports modules from /node_modules
import resolve from 'rollup-plugin-node-resolve';

//Cleanup & minification step:
import replace from 'gulp-replace';
import strip from 'gulp-strip-comments';
import header from 'gulp-header';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

import * as pkg from './package.json';


const globalName = 'Picker',
      outFolder = 'dist/',
      //Remove scope (if any) from output path:
      outFile = pkg.name.replace(/.*\//, '');

const myBanner = `/*!
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright 2017-<%= new Date().getFullYear() %> <%= pkg.author %>
 * Released under the <%= pkg.license %> license.
 */
`;


gulp.task('build', function() {
    return rollup({
        input: pkg.module,
        plugins: [
            resolve({
                module: true,
            }),
            babel({
                babelrc: false,
                presets: [
                  ["env", { modules: false }]
                ],
                //We import ES6 modules (color-conversion and drag-tracker)..
                //  exclude: 'node_modules/**',

                plugins: ["external-helpers"],
            }),
        ],
    })
    .then(bundle => {
        return bundle.generate({
          format: 'umd',
          name: globalName,
        });
    })
    .then(gen => {
        
        //Before we create the destination file, prepare the CSS which we'll paste into the JS code:
        //https://github.com/dlmanning/gulp-sass#basic-usage
        gulp.src(pkg.module.replace('.js', '.scss'))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))

            //https://stackoverflow.com/questions/41523743/can-i-convert-a-gulp-stream-into-a-string
            .on('data', function(cssStream) {
                const css = cssStream.contents.toString();
                //console.log(css);

                //Insert the CSS 
                file(outFile + '.js', gen.code, { src: true })
                    .pipe(strip())
                    .pipe(replace('## PLACEHOLDER-CSS ##', css.replace(/'/g, "\\'").trim()))
        
                    //Write un-minified:
                    .pipe(header(myBanner, { pkg : pkg }))
                    .pipe(gulp.dest(outFolder))
        
                    //Minify:
                    //https://codehangar.io/concatenate-and-minify-javascript-with-gulp/
                    //https://stackoverflow.com/questions/32656647/gulp-bundle-then-minify
                    //(https://stackoverflow.com/questions/40609393/gulp-rename-illegal-operation)
                    .pipe(rename({ extname: '.min.js' }))
                    .pipe(uglify())
        
                    .pipe(header(myBanner, { pkg: pkg }))
                    .pipe(gulp.dest(outFolder));
            });
    });
});


//https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglobs-opts-fn
//https://css-tricks.com/gulp-for-beginners/
gulp.task('watch', function(){
    console.log('** Listening for file changes...');

    var watcher = gulp.watch('src/**/*.*', gulp.parallel('build'));
    
    watcher.on('change', function(path, stats) {
      console.log('File ' + path + ' was changed');
    });
    watcher.on('unlink', function(path) {
      console.log('File ' + path + ' was removed');
    });
});


gulp.task('default', gulp.series('build', 'watch'));

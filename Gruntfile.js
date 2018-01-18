module.exports = function(grunt) {
  
  const pkg = grunt.file.readJSON('package.json'),
        srcJS = 'src/picker.js',
        destJS = 'dist/picker.js',
        srcCSS = 'src/picker.scss',
        destCSS = 'dist/picker.css';

  //Copied the short default from https://www.npmjs.com/package/add-banner
  const myBanner = `/*!
 * <%= pkg.name %> <<%= pkg.homepage %>>
 * <%= pkg.description %>
 * Version <%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd") %>
 *
 * Copyright (c) 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>
 * Licensed under the <%= pkg.license %> license.
 */`;
  
  
  grunt.initConfig({
    pkg: pkg, //grunt.file.readJSON('package.json'),
    
    
    /*
      1: The first thing we need to do is insert the CSS into the JS file,
         because we use the ES6 `` string delimiters as a better-than-nothing solution to avoid conflicts with strings in the CSS
    */

    //https://www.npmjs.com/package/grunt-sass
    sass: {
  		options: {
  			//sourceMap: true,
  			outputStyle: 'compressed',
  		},
  		myDistBuild: {
    		src: srcCSS,
    		dest: destCSS,
  		}
  	},
	  //https://www.npmjs.com/package/grunt-replace
  	replace: {
      myDistBuild: {
        options: {
          patterns: [
            {
              match: '## PLACEHOLDER-CSS ##',
              replacement: '<%= grunt.file.read("' +destCSS+ '") %>',
            }
          ],
          usePrefix: false
        },
    		src: srcJS,
    		dest: destJS,
      }
    },


    /*
      2: Transpile and minify the JS
    */

    //https://github.com/babel/grunt-babel
    babel: {
    	options: {
    	  //Not a valid option
    	  //  banner: myBanner,
    	  //Removed by the other "comments: false" option
    	  //  auxiliaryCommentBefore: myBanner,
    	  
    	  moduleId: pkg.name,
    		presets: ['env'],
    		plugins: ["transform-es2015-modules-umd"], //https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-umd
    		comments: false,
    		//compact: true, //Removes all whitespace
    	},
    	myDistBuild: {
    		//files: {
    		//	destJS /* ES5 target */: destJS /* ES6 source */,
    		//},
    		src: destJS,
    		dest: destJS,
    	}
    },
    //https://github.com/mattstyles/grunt-banner
    usebanner: {
      myDistBuild: {
        options: {
          banner: myBanner,
        },
        src: [ destJS ],
      }
    },
    uglify: {
      options: {
        banner: myBanner,
      },
      myDistBuild: {
    		src: destJS,
    		dest: destJS.replace(/\.js$/, '.min.js'),
      }
    },
    
  });


  //https://github.com/sindresorhus/load-grunt-tasks
  //
  //  //https://github.com/babel/grunt-babel
  //  grunt.loadNpmTasks('grunt-babel');
  //
  //  grunt.loadNpmTasks('grunt-contrib-uglify');
  //  grunt.loadNpmTasks('grunt-contrib-concat');
  //
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.registerTask('cleanup', '', function() {
    //Delete the no longer needed CSS file
    grunt.file.delete(destCSS);
  });
  
  grunt.registerTask('default', ['sass', 'replace', 'babel', 'usebanner', 'uglify', 'cleanup']);

};

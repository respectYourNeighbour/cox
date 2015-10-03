module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      js: {
        src: ['public/js/libs/jquery.1.11.1.js',
              'public/js/libs/textition.1.0.2.js',
              'public/js/libs/bootstrap3.2.0.js',
              'public/js/libs/angular.1.4.4.js',
              'public/js/libs/angular-cookies.1.4.4.js',
              'public/js/libs/angular-ui-router0.2.15.js',
              'public/js/libs/angular-toastr.tpls.js',
              'public/js/libs/satellizer.js'],
        dest: 'public/js/libs/<%= pkg.name %>.js'
      },
      css: {
        src: ['public/css/font-awesome4.3.0.css',
              'public/css/bootstrap3.2.0.css',
              'public/css/ionicons.css',
              'public/css/angular-toastr.css',
              'public/css/other_css.css',
              'public/css/style.css'],
        dest: 'public/css/<%= pkg.name %>.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};

/*
1. "newer:concat"     -> Concatenating the JS and CSS files to only 1 file each, from folder /js and /css, and sending them to folder dest/deletable;
*/
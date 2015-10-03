module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    less: {
      development: {
        options: {
          paths: ["public/css/*.css"]
        },
        files: {
          "public/css/style.css": "public/css/*.less"
        }
      }
    },
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
      angular: {
        src: ['public/js/main_app.js',
              'public/js/services/AccountService.js',
              'public/js/services/LoginService.js',
              'public/js/services/UserService.js',
              'public/js/controllers/HomeCtrl.js',
              'public/js/controllers/ProfileCtrl.js',
              'public/js/controllers/NavbarCtrl.js',
              'public/js/controllers/LoginCtrl.js',
              'public/js/controllers/SignUpCtrl.js',
              'public/js/controllers/RecipesCtrl.js',
              'public/js/directives/loadingDirective.js'],
        dest: 'public/js/myAppConcat.js'
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
    },
    watch: 
    {   files: ['public/css/**/*.less', 'public/js/**/*.js', 'css/**/*.css'],
        tasks: ['newer:less', 'newer:concat'],
        livereload: {
            options: { livereload: true },
            files: ['public/**/*.html', 'public/**/*.css','public/**/*.js'],
        },
    }
  });

  /*Load Packages*/
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /*Define a grunt task*/
  grunt.registerTask('default', ['newer:less','newer:concat']);
  grunt.registerTask('watchme', ['watch']);

};

/*
1. "newer:concat"     -> Concatenating the JS and CSS files to only 1 file each, from folder /js and /css, and sending them to folder dest/deletable;
*/
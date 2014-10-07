module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    htmlmin: {
      dest:{
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dest/<%= pkg.name %>.html':'*.html'
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["css/*.css"]
        },
        files: {
          "css/style.css": "css/*.less"
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: 'js/**/*.js', 
        dest: 'dest/deletable/<%= pkg.name %>.js'
      },
      css: {
        src: 'css/*.css',
        dest: 'dest/deletable/<%= pkg.name %>.css'
      }
    }, 
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dest/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dest: {
        files: {
          'dest/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    watch: {
      files: ['css/**/*.less', 'css/**/*.css','js/**/*.js','*.html'],
      tasks: ['less', 'concat', 'cssmin','uglify', 'htmlmin'],
      options: {livereload: true}
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['less', 'concat', 'cssmin', 'uglify','htmlmin']);
  grunt.registerTask('watchme', ['watch']);
};

/*
Concat: Cauta toate fisierele din folderul src cu extensia .js si le concateneaza.
Uglify: Banerul este un comentariu ce va fi pus in fisierul minificat. Uglify va face minify doar la fisierele .js
CSSMIN: Va face minify la fisierele de CSS.
WATCH: Va monitoriza fisierele trecute in parametrul din watch si va efectua anumite taskuri atunci cand unul din fisiere este modificat.
*/
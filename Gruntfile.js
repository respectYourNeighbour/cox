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
                    'dest/index.html':'*.html'
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
            // options: {
            //   separator: ';'
            // },
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
                    'dest/css/style.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        "merge-json": {
            "en": {
                src: [ "resources/*.json" ],
                dest: "dest/resources/lista.json"
            }
        },
        jsonmin: {
            stripAll: {
                options: {
                    stripWhitespace: true,
                    stripComments: true
                },
                files: {
                    'dest/resources/lista1.json': ['dest/resources/*.json']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dest: {
                files: {
                    'dest/js/app.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        watch: {
            files: ['css/**/*.less', 'css/**/*.css','js/**/*.js','*.html', 'resources/*.json'],
            tasks: ['newer:less', 'newer:concat', 'newer:cssmin','newer:uglify', 'newer:htmlmin', 'newer:merge-json', 'newer:jsonmin'],
            livereload: {
                options: { livereload: true },
                files: ['dest/**/*'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-jsonmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['newer:less', 'newer:concat', 'newer:cssmin', 'newer:uglify','newer:htmlmin', 'newer:merge-json', 'newer:jsonmin']);
    grunt.registerTask('watchme', ['watch']);
};

/*
Concat: Cauta toate fisierele din folderul src cu extensia .js si le concateneaza.
Uglify: Banerul este un comentariu ce va fi pus in fisierul minificat. Uglify va face minify doar la fisierele .js
CSSMIN: Va face minify la fisierele de CSS.
WATCH: Va monitoriza fisierele trecute in parametrul din watch si va efectua anumite taskuri atunci cand unul din fisiere este modificat.
*/
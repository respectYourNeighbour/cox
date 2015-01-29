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
        uncss: {
            dest: {
                options: {
                    stylesheets: ['dest/deletable/AngularDraft.css']
                },
                files: {
                    'dest/deletable/tidy.css': ['index.html']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    'dest/css/style.min.css': ['dest/deletable/tidy.css']
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
            tasks: ['newer:less', 'newer:concat', 'newer:htmlmin', 'newer:uglify', 'newer:merge-json', 'newer:jsonmin', 'uncss', 'cssmin'],
            livereload: {
                options: { livereload: true },
                files: ['dest/**/*.html','dest/**/*.css','dest/**/*.js'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-jsonmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['newer:less', 'newer:concat', 'newer:htmlmin', 'newer:uglify', 'newer:merge-json', 'newer:jsonmin', 'uncss', 'cssmin']);
    grunt.registerTask('watchme', ['watch']);
};

/*
1. "newer:less"       -> Converting LESS file to CSS in folder /css;
2. "newer:concat"     -> Concatenating the JS and CSS files to only 1 file each, from folder /js and /css, and sending them to folder dest/deletable;
3. "newer:htmlmin"    -> Minifying the .html files and send them to folder /dest;
4. "newer:uglify"     -> Minifying the JS files from folder dest/deletable to folder dest/js;
5. "newer:merge-json" -> Merging JSON files to only 1 JSON file to folder /dest/resources/list.json;
6. "newer:jsonmin"    -> Minifying the JSON file;
7. "uncss"            -> Cleaning the CSS file from folder /dest/deletable/*.css to another file in the same folder tidy.css;
8. "cssmin"           -> Minifying the tidy CSS file; 

WATCH: will monitor for changes in all the files mentioned in the watch task, and will execute some task when changes were made to the monitored files;
NEWER: will only trigger a grunt task if the source file is newer than the destination files;

*/
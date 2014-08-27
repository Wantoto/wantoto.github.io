var localization = require('./localization.js');
var scriptFinder = require('./script-finder.js');

var defaultLang = 'tw';

module.exports = function(grunt) {
    'use strict';

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            launchDevServer: {
                options: {
                    stdout: true
                },
                command: 'node app.js'
            }
        },

        less: {
            options: {
                ieCompat: false
            },
            prod: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: [{
                    expand: true,
                    cwd: 'static/stylesheets',
                    src: ['**/*.less', '!lib/**/*.less', '!common/**/*.less'],
                    dest: 'static/stylesheets',
                    ext: '.css'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'static/stylesheets',
                    src: ['**/*.less', '!lib/**/*.less', '!common/**/*.less'],
                    dest: 'static/stylesheets',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                cascade: false
            },
            default: {
                expand: true,
                flatten: true,
                src: 'static/stylesheets/**/*.css',
                dest: 'static/stylesheets/'
            }
        },

        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'static/images',
                    src: ['**/*.{png,jpg,jpeg,gif,svg}'],
                    dest: 'static/images'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            frontend: {
                files: [{
                    expand: true,
                    cwd: 'static/scripts',
                    src: ['**/*.js', '!**/*.min.js', '!lib/**/*.js', '!common/**/*.js']
                }]
            }
        },

        uglify: {
            options: {
                banner: '/* Copyright (c) 2014 Wantoto Inc. All rights reserved. */\n'
            },
            fontend: {
                options: {
                    compress: {
                        drop_console: true,
                        dead_code: true,
                        properties: true,
                        drop_debugger: true,
                        conditionals: true,
                        evaluate: true,
                        loops: true,
                        unused: true,
                        if_return: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'static/scripts',
                    src: ['**/*.js', '!**/*.min.js', '!common/**/*.js', '!lib/**/*.js'],
                    dest: 'static/scripts',
                    ext: '.min.js'
                }]
            }
        },

        jade: {
            default: {
                options: {
                    data: {
                        localText: localization.localText(defaultLang),
                        scriptFinder: scriptFinder.scriptFinder(true)
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.jade', '!common/**/*.jade', '!node_modules/**/*.*'],
                    dest: '.',
                    ext: '.html'
                }]
            },
            tw: {
                options: {
                    data: {
                        localText: localization.localText('tw'),
                        scriptFinder: scriptFinder.scriptFinder(true)
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.jade', '!common/**/*.jade', '!node_modules/**/*.*'],
                    dest: 'tw',
                    ext: '.html'
                }]
            },
            en: {
                options: {
                    data: {
                        localText: localization.localText('en'),
                        scriptFinder: scriptFinder.scriptFinder(true)
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.jade', '!common/**/*.jade', '!node_modules/**/*.*'],
                    dest: 'en',
                    ext: '.html'
                }]
            }
        },

        watch: {
            less: {
                files: 'static/stylesheets/**/*.less',
                tasks: ['less:dev', 'autoprefixer']
            },
            jade: {
                files: '**/*.jade',
                tasks: ['jade']
            },
            jshint: {
                files: ['**/*.js', '!**/*.min.js'],
                tasks: ['jshint']
            },
            uglify: {
                files: ['static/**/*.js', '!**/*.min.js'],
                tasks: ['uglify']
            },
            livereload: {
                // Changes of less should be delegated to changes of css.
                files: ['**/*.jade', '**/*.md', 'static/**/*.*', '!static/**/*.less', '!node_modules/**/*.*'],
                options: {
                    livereload: true
                }
            }
        },

        concurrent: {
            'dev': {
                tasks: ['watch:less', 'watch:livereload', 'dev-server'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    // Register modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Declare task alias
    grunt.registerTask('minify-image', ['newer:imagemin:default']);

    grunt.registerTask('dev-server', ['shell:launchDevServer']);
    grunt.registerTask('dev', ['concurrent:dev']);

    grunt.registerTask('build:js', ['jshint', 'uglify']);
    grunt.registerTask('build:css', ['less:prod', 'autoprefixer']);
    grunt.registerTask('build:image', ['minify-image']);
    grunt.registerTask('build:html', ['jade']);
    grunt.registerTask('build', ['build:js', 'build:css', 'build:image', 'build:html']);

    grunt.registerTask('default', ['build']);
};

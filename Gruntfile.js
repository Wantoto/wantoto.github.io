var localization = require('./localization.js');

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
            },
            deploy: {
                options: {
                    stdout: true
                },
                command: 'git add --all .; git commit -am "Deploy"; git pull; git push'
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
            options: {
                data: {
                    _t: localization.getLocalText('en')
                }
            },
            default: {
                expand: true,
                cwd: '.',
                src: ['**/*.jade', '!common/**/*.jade', '!tw/**/*.jade'],
                dest: '.',
                ext: '.html'
            },
            tw: {
                options: {
                    data: {
                        _t: localization.getLocalText('tw')
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'tw',
                    src: ['**/*.jade', '!common/**/*.jade'],
                    dest: 'tw',
                    ext: '.html'
                }]
            }
        },

        watch: {
            less: {
                files: '/static/stylesheets/**/*.less',
                tasks: ['less:dev']
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
                files: ['**/*.html', 'static/**.*', '!static/**/*.less'],
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
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-concurrent');

    // Declare task alias
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
    grunt.registerTask('dev', ['concurrent:dev']);

    grunt.registerTask('build:js', ['jshint', 'uglify']);
    grunt.registerTask('build', ['build:js', 'less:prod', 'jade']);

    grunt.registerTask('deploy', ['build', 'shell:deploy']);

    grunt.registerTask('default', ['build']);
};

/*jshint node:true*/
/*global module:false*/

var localization = require('./localization.js');

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        shell: {
            launchDevServer: {
                options: {
                    stdout: true
                },
                command: 'node app.js'
            }
        },

        less: {
            development: {
                options: {
                    ieCompat: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'static/stylesheets',
                        src: ['*.less', '!common/**/*.less'],
                        dest: 'static/stylesheets',
                        ext: '.css'
                    }
                ]
            },
            production: {
                options: {
                    compress: true,
                    cleancss: true,
                    ieCompat: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'static/stylesheets',
                        src: ['*.less', '!common/**/*.less'],
                        dest: 'static/stylesheets',
                        ext: '.css'
                    }
                ]
            }
        },

        jade: {
            default: {
                options: {
                    data: {
                        _t: localization.getLocalText('en')
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['*.jade', '!common/**/*.jade'],
                        dest: '.',
                        ext: '.html'
                    }
                ]
            },
            tw: {
                options: {
                    data: {
                        _t: localization.getLocalText('tw')
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['*.jade', '!common/**/*.jade'],
                        dest: 'tw/',
                        ext: '.html'
                    }
                ]
            }
        },

        watch: {
            stylesheets: {
                files: ['static/stylesheets/**/*.less'],
                tasks: ['less:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-shell');

    // Tasks
    grunt.registerTask('build:jade', ['jade']);
    grunt.registerTask('build:less', ['less:production']);
    grunt.registerTask('build', ['build:jade', 'build:less']);
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
};

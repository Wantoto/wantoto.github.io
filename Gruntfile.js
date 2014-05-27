/*global module:false*/

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
            compile: {
                options: {
                    i18n: {
                        locales: 'locales/*.json'
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
            }
        },

        copy: {
            localizedPages: {
                files: [
                    {expand: true, cwd: 'en/', src: ['**'], dest: './'}
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jade-i18n');

    // Tasks
    grunt.registerTask('build:jade', ['jade', 'copy:localizedPages']);
    grunt.registerTask('build:less', ['less:production']);
    grunt.registerTask('build', ['build:jade', 'build:less']);
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
};

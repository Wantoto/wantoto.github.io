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

                expand: true,
                cwd: 'static/stylesheets',
                src: ['*.less', '!common/**/*.less'],
                dest: 'static/stylesheets',
                ext: '.css'
            },
            production: {
                options: {
                    compress: true,
                    cleancss: true,
                    ieCompat: false
                },

                expand: true,
                cwd: 'static/stylesheets',
                src: ['*.less', '!common/**/*.less'],
                dest: 'static/stylesheets',
                ext: '.css'
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
    grunt.loadNpmTasks('grunt-shell');

    // Tasks
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
};

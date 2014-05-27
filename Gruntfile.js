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
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Tasks
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
};

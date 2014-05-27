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
        }
    });

    grunt.loadNpmTasks('grunt-shell');

    // Tasks
    grunt.registerTask('dev-server', ['shell:launchDevServer']);
};

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		jekyll: {
			options: {
				bundleExec: true,
				serve: true,
				watch: true,
				src : '<%= app %>'
			},
			dist: {
				options: {
					dest: '<%= dist %>',
					config: '_config.yml'
				}
			},
			serve: {
				options: {
					dest: '.jekyll',
					drafts: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-jekyll');

	grunt.registerTask('default', ['jekyll:serve']);

}
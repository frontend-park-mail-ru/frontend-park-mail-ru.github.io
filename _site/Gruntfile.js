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
					dest: '_site',
					drafts: true
				}
			}
		},

		markdown: {
			all: {
				files: [
					{
						expand: true,
						src: '**/*.md',
						dest: '_site/',
						ext: '.html'
					},
					{
						src: 'index.md',
						dest: './index.html',
						ext: '.html'
					}
				],
				options: {
					template: '_layouts/default.jst',
					preCompile: function(src, context) {},
					postCompile: function(src, context) {},
					templateContext: {
						site_title: 'Технопарк@Mail.Ru. Фронтенд разработка.',
						page_title: ''
					},
					contextBinder: false,
					contextBinderMark: '@@@',
					markdownOptions: {
						gfm: true,
						highlight: 'manual',
						codeLines: {
							before: '<span>',
							after: '</span>'
						}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-markdown');

	grunt.registerTask('default', ['jekyll:serve']);

}
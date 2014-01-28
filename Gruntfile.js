module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            theses: {
                files: ['theses.md', 'template.html'],
                tasks: ['markdown:theses'],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },
        connect: {
            theses: {
                options: {
                    open: 'http://localhost:8080/theses.html',
                    livereload: true,
                    port: 8080
                }
            },
            persistent: {
                options: {
                    keepalive: true,
                    port: 8080
                }
            }
        },
        markdown: {
            options: {
                template: 'template.html',
                markdownOptions: {
                    highlight: 'manual'
                }
            },
            theses: {
                files: [{
                    expand: true,
                    src: 'theses.md',
                    dest: '.',
                    ext: '.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.registerTask('theses', ['connect:theses', 'watch:theses']);
    grunt.registerTask('default', ['markdown:theses']);

};
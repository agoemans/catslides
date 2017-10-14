module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect:{
			server:{
				options: {
					port: 8000,
                    base: ['_build', 'node_modules']
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/**/*.js', 'html/*'],
                tasks: ['clean:build', 'uglify:dev', 'copy',]
			}
		},
		uglify: {
			dev: {
				options: {
					mangle: false
				},
				files: {
		            '_build/js/assignment.js': [
		            	'js/app.js',
                        'js/objects/slideImage.js',
                        'js/objects/slideText.js',
                        'js/objects/arrow.js',
                        'js/objects/slide.js'
                    ]
				}
			}
		},
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ['assets/images/**'], dest: '_build/assets/images/'},
					{expand: true, flatten: true, src: ['assets/css/**'], dest: '_build/assets/css/'},
					{expand: true, flatten: true, src: ['node_modules/pixi.js/dist/pixi.min.js'], dest: '_build/js'},
                    {expand: true, flatten: true, src: ['html/index.html'], dest: '_build'}
				]
			}
		},
        clean: {
            build: ["_build/*"],
			tmp: ["tmp/**"]

        }
	});

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', [
    	'clean:build',
        'uglify:dev',
        'copy',
        'connect',
        // 'clean:tmp',
        'watch'
    ]);

};
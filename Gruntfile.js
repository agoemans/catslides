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
                        'js/helpers/loaderHelper.js',
                        'js/app.js',
                        'js/helpers/notifyHelper.js',
                        'js/helpers/interactiveboxHelper.js',
                        'js/controller/slideShowController.js',
                        'js/controller/navigatorController.js',
                        'js/backEndObjects/backendLink.js',
                        'js/helpers/backendLinkHelper.js',
                        'js/backEndObjects/backendSlide.js',
                        'js/model/slideShowModel.js',
                        'js/view/slideShowView.js',
                        'js/view/navigatorView.js',
                        'js/guiObjects/roundedBox.js',
                        'js/guiObjects/slideImage.js',
                        'js/guiObjects/slideText.js',
                        'js/guiObjects/arrow.js',
                        'js/guiObjects/slide.js'
                    ]
				}
			}
		},
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ['assets/images/**'], dest: '_build/assets/images/'},
					{expand: true, flatten: true, src: ['assets/css/**'], dest: '_build/assets/css/'},
					{expand: true, flatten: true, src: ['assets/data/**'], dest: '_build/assets/data/'},
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
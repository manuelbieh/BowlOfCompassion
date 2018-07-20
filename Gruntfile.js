/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	// require('load-grunt-tasks')(grunt);
	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace',
		configureRewriteRules: 'grunt-connect-rewrite'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('grunt/_config.json')
	});

	//grunt.loadTasks('grunt/_config.js');
	grunt.loadTasks('grunt');
	grunt.loadNpmTasks('assemble');

	grunt.registerTask('serve',
		'Starts a static webserver with livereload',
		function (target) {

			var tasks = [];

			if (target === 'dist') {
				return grunt.task.run(['build', 'connect:dist:keepalive', 'watch']);
			} else {
				tasks = ['dev', 'configureRewriteRules', 'connect:livereload', 'watch'];
			}

			grunt.task.run(tasks);

		}

	);

	grunt.registerTask('deploy',
		'Deploys dist/htdocs folder on a public webserver via ftp',
		function(target) {

			if (target === 'live') {

				return grunt.task.run(['build', 'ftpush:live']);

			} else {

				return grunt.task.run(['build', 'ftpush:stage']);

			}

		}

	);

	grunt.registerTask('dev',
		'Quickly build site files for development.',
		[
			'clean:dev',
			'copy:dev',
			'assemble',
			// 'useminPrepare',
			//'bowerInstall',
			'sass:dev',
			// 'concat',
			// 'uglify',
			// 'cssmin',
			'autoprefixer',
			//'rev',
			// 'usemin',
			'replace:subfolders',
			// 'imagemin',
			'svgmin'
			//'clean:post'
		]
	);

	grunt.registerTask('build',
		'Build site files for deployment.',
		[
			'clean:pre',
			'copy:prod',
			'assemble',
			// 'useminPrepare',
			// 'bowerInstall',
			'sass:prod',
			// 'concat',
			// 'uglify',
			// 'cssmin',
			'autoprefixer',
			// 'compress:gzip',
			// 'rev',
			// 'usemin',
			// 'imagemin',
			'svgmin',
			'htmlmin',
			'replace:subfolders',
			// 'replace:prod',
			'clean:post'
		]
	);

	grunt.registerTask('default', ['serve:dev']);

	// Alias tasks
	grunt.registerTask('stage', ['deploy:stage']);
	grunt.registerTask('publish', ['deploy:live']);

};

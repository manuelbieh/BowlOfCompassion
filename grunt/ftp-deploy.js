module.exports = function(grunt) {

	grunt.config('ftp-deploy', {

		live: {
			auth: {
				host: 'wiremore.de',
				port: 21,
				authKey: 'live'
			},
			src: '<%= config.dirs.dist %>/htdocs',
			dest: './',
			exclusions: []
		},

		stage: {
			auth: {
				host: 'wiremore.de',
				port: 21,
				authKey: 'stage'
			},
			src: '<%= config.dirs.dist %>/htdocs',
			dest: './',
			exclusions: []
		}

	});

	//grunt.loadNpmTasks('grunt-ftp-deploy');

}
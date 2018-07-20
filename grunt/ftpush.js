module.exports = function(grunt) {

	grunt.config('ftpush', {

		live: {
			auth: {
				host: 'bowlofcompassion.org',
				port: 21,
				authKey: 'live'
			},
			src: '<%= config.dirs.dist %>/htdocs',
			dest: './',
			exclusions: [],
			keep: ['./logs/*']
		},

		stage: {
			auth: {
				host: 'bowlofcompassion.org',
				port: 21,
				authKey: 'stage'
			},
			src: '<%= config.dirs.dist %>/htdocs',
			dest: './',
			exclusions: [],
			keep: ['./logs/*']
		}

	});

	//grunt.loadNpmTasks('grunt-ftp-deploy');

}
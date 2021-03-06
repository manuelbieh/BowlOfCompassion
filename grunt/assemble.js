module.exports = function(grunt) {

	grunt.config('assemble', {

		options: {
			assets: '<%= config.dirs.dist %>/htdocs',
			plugins: ['permalinks'],
			helpers: '<%= config.dirs.src %>/templates/helpers/*.js',
			partials: ['<%= config.dirs.src %>/templates/partials/shared/**/*.hbs'],
			layout: 'default.hbs',
			layoutdir: '<%= config.dirs.src %>/templates/layouts/',
			data: ['<%= config.dirs.src %>/templates/data/{de,shared}/**/*.{json,yml}']
		},

		de: {
			options: {
				data: [
					'<%= config.dirs.src %>/templates/data/shared/**/*.{json,yml}',
					'<%= config.dirs.src %>/templates/data/de/**/*.{json,yml}'
				],
				partials: [
					'<%= config.dirs.src %>/templates/partials/shared/**/*.hbs',
					'<%= config.dirs.src %>/templates/partials/de/**/*.hbs'
				],
			},
			files: [
				{
					cwd: '<%= config.dirs.src %>/templates/',
					dest: '<%= config.dirs.dist %>/htdocs/de',
					expand: true,
					flatten: false,
					src: ['*.hbs']
				}
			]
		},

		en: {
			options: {
				data: [
					'<%= config.dirs.src %>/templates/data/shared/**/*.{json,yml}',
					'<%= config.dirs.src %>/templates/data/en/**/*.{json,yml}'
				],
				partials: [
					'<%= config.dirs.src %>/templates/partials/shared/**/*.hbs',
					'<%= config.dirs.src %>/templates/partials/en/**/*.hbs'
				],
			},
			files: [
				{
					cwd: '<%= config.dirs.src %>/templates/',
					dest: '<%= config.dirs.dist %>/htdocs/en',
					expand: true,
					flatten: false,
					src: ['*.hbs']
				}
			]
		},


		// site: {
		// 	options: {
		// 		data: [
		// 			'<%= config.dirs.src %>/templates/data/de/*.{json,yml}',
		// 			'<%= config.dirs.src %>/templates/data/shared/*.{json,yml}'
		// 		]
		// 	},
		// 	files: [{

  //               cwd: '<%= config.dirs.src %>/templates/',
  //               dest: '<%= config.dirs.src %>/',
  //               //dest: '<%= config.dirs.dist %>/htdocs/',
  //               expand: true,
  //               flatten: false,
  //               src: ['*.hbs']

		// 	}]

		// },

		// site: {

		// 	files: [{

  //               cwd: '<%= config.dirs.src %>/templates/',
  //               dest: '<%= config.dirs.src %>/',
  //               //dest: '<%= config.dirs.dist %>/htdocs/',
  //               expand: true,
  //               flatten: true,
  //               src: ['*.hbs']

		// 	}]

		// }

	});

	grunt.loadNpmTasks('assemble');

}
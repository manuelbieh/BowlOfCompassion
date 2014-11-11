/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('grunt/_config.json'),


		assemble: {

			options: {
				assets: 'assets',
				plugins: ['permalinks'],
				helpers: '<%= config.dirs.src %>/templates/helpers/*.js',
				partials: ['<%= config.dirs.src %>/templates/partials/**/*.hbs'],
				layout: 'default.hbs',
				layoutdir: '<%= config.dirs.src %>/templates/layouts/',
				data: ['<%= config.dirs.src %>/templates/data/**/*.{json,yml}']
			},

			site: {

				files: [{

	                cwd: '<%= config.dirs.src %>/templates/',
	                dest: '<%= config.dirs.src %>/',
	                //dest: '<%= config.dirs.dist %>/htdocs/',
	                expand: true,
	                flatten: true,
	                src: ['*.hbs']

				}]

			}

		},

		autoprefixer: {
			options: {
				browsers: ['last 3 version', 'ie 8', 'ie 9']
			},
			build: {
				expand: true,
				src: [ '**/*.css' ],
				cwd: '<%= config.dirs.dist %>/htdocs/css',
				dest: '<%= config.dirs.dist %>/htdocs/css',
			}
		},

		concurrent: {
	        minify: ['usemin', 'imagemin' ]
		},


		clean: {
			dev: [
				'<%= config.dirs.dist %>/htdocs/css/*',
				'<%= config.dirs.dist %>/htdocs/js/*'
			],
			pre: [
				'<%= config.dirs.dist %>/*'
			],
			post: [
				'<%= config.dirs.dist %>/**/*.scss',
				'<%= config.dirs.dist %>/**/*.sass',
				'<%= config.dirs.dist %>/**/*.coffee',
				'<%= config.dirs.dist %>/**/*.styl',
				'<%= config.dirs.dist %>/**/*.less',
				'<%= config.dirs.dist %>/htdocs/css/!(*styles*|*vendor*).css',
				'<%= config.dirs.dist %>/htdocs/js/!(*main*).js',
				'.tmp'
			]
		},


		concat: {
			options: {
				stripBanners: false,
			},
			prod: {
				files: {
					'<%= config.dirs.dist %>/htdocs/css/custom.css': [
						'<%= config.dirs.dist %>/htdocs/css/vendor.css',
						'<%= config.dirs.dist %>/htdocs/css/custom.css'
					]
				}
			}
		},

		connect: {

			options: {
				port: 9009,
				livereload: 35731,
				// Default is 35729. Feel free to change when working on several projects
				// at the same time to prevent "port already in use" errors
				useAvailablePort: true,
				hostname: 'localhost' // use 0.0.0.0 to make it available to public. Note: 0.0.0.0 might be fucked up on windows machines.
			},
			rules: [
				{
					from: '/example.html',
					to: '/index.html'
				}
			],
			livereload: {

				options: {

					open: true,
					base: [
						'.tmp',
						'<%= config.dirs.src %>',
						'<%= config.dirs.dist %>/htdocs'
					],
					middleware: function(connect, options) {

						var middlewares = [];

						// Add RewriteRules support
						middlewares.push(
							require('grunt-connect-rewrite/lib/utils').rewriteRequest
						);

						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						var directory = options.directory || options.base[options.base.length - 1];
						options.base.forEach(function (base) {
							middlewares.push(connect.static(base));
						});

						// Make directory browse-able.
						middlewares.push(connect.directory(directory));

						return middlewares;

					}

				},

			},

			dist: {
				options: {
					open: true,
					base: '<%= config.dirs.dist %>/htdocs',
					livereload: false,
					middleware: '<%= connect.livereload.options.middleware %>'
				},
			}

		},

		copy: {
			prod: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.dirs.src %>',
					dest: '<%= config.dirs.dist %>/htdocs',
					src: [
						'*.html',
						'{,*/}*.{ico,png,txt,json}',
						'.htaccess',
						'img/{,*/}*.{webp,gif,GIF,jpeg,jpg}',
						'fonts/{,*/}*.*',
						'js/**/*.js',
						'css/**/*.css',
						//'js/vendor/*.js',
						//'components/**/*'
					]
				}]
			},
			dev: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.dirs.src %>',
					dest: '<%= config.dirs.dist %>/htdocs',
					src: [
						'*.html',
						'{,*/}*.{ico,png,txt,json}',
						'.htaccess',
						'img/{,*/}*.{webp,gif,GIF,jpeg,jpg}',
						'fonts/{,*/}*.*',
						'js/**/*.js',
						'css/**/*.css',
					//	'components/**/*'
					]
				}]
			}
		},

		htmlmin: {
			prod: {
				options: {
					removeComments: true,
				},
				files: {
					'<%= config.dirs.dist %>/htdocs/index.html': '<%= config.dirs.dist %>/htdocs/index.html'
				}
			}
		},


		imagemin: {
			options: {
				optimizationLevel: 1
			},
			dist: {
				files: [
					{
						cwd: '<%= config.dirs.src %>/img/',
						dest: '<%= config.dirs.dist %>/htdocs/img/',
						expand: true,
						src: ['**/*.{jpg,png,gif}']
					}
				]
			},
		},

		sass: {
			"dev": {
				"files": {
					"<%= config.dirs.dist %>/htdocs/css/custom.css" : "<%= config.dirs.src %>/scss/custom.scss"
				},
				"options": {
					"lineNumbers": true,
					"sourcemap": true
				},
				"compass": true
			},
			"prod": {
				"files": {
					"<%= config.dirs.dist %>/htdocs/css/custom.css" : "<%= config.dirs.src %>/scss/custom.scss"
				},
				"options": {
					"style": "compressed"
				}
			}
		},

		uglify: {

			"dev": {
				options: {
					preserveComments: 'some',
					sourceMap: true,
				}
			},
			"prod": {

				options: {
					preserveComments: 'some',
				},

				files: {
				}

			}

		},

		watch: {

			htmlcssjs: {

				options: {
					//livereload: true,
					livereload: '<%= connect.options.livereload %>'
				},

				files: [
					'<%= config.dirs.src %>/**/*.{html,js,hbs,json,css,scss}',
				],

				tasks: [
					'clean:dev',
					'useminPrepare',
					'sass:dev',
					'copy:dev',
					'assemble',
					'useminPrepare',
					'concat',
					'uglify',
					'cssmin',
					'autoprefixer',
					// 'rev',
					'usemin'
				]

			},

			bower: {

				options: {
					//livereload: true,
					livereload: '<%= connect.options.livereload %>',
					event: ['added', 'deleted'/*, 'changed'*/]
				},

				files: [
					'<%= config.dirs.src %>/components/**/*'
				],

				tasks: ['bowerInstall']

			},

			imagemin: {

				options: {
					//livereload: true,
					livereload: '<%= connect.options.livereload %>'
				},

				files: [
					'<%= config.dirs.src %>/img/**/*'
				],

				tasks: ['newer:imagemin']

			},

			livereload: {

				options: {
					livereload: '<%= connect.options.livereload %>'
				},

				files: [
					'<%= config.dirs.src %>/{,*/}*.html',
					'<%= config.dirs.src %>/{,*/}*.{css,scss,sass,less,styl}',
					'<%= config.dirs.src %>/{,*/}*.js',
					'.tmp/styles/{,*/}*.css',
					'<%= config.dirs.src %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
				]

			}

		},

		replace: {

			prod: {

				src: [
					'<%= config.dirs.dist %>/**/*.html'
				],
				overwrite: true,
				replacements: [
					{
						from: '$version$',
						to: '<%= pkg.version %>'
					},
					{
						from: /<script (.*)src="js\//,
						to: '<script $1src="<%= config.url.prod.static %>js/'
					},
					{
						from: /<link (.*)href="css\//,
						to: '<link $1href="<%= config.url.prod.static %>css/'
					},
					{
						from: /<img(.*)src="img\//,
						to: '<img $1src="<%= config.url.prod.static %>img/'
					}
				]

			}

		},

		svgmin: {
			options: {
				 plugins: [
					{ cleanupAttrs: true },
					{ cleanupEnableBackground: true },
					{ cleanupIDs: true },
					{ cleanupNumericValues: true },
					{ collapseGroups: true },
					{ convertColors: true },
					{ convertPathData: true },
					{ convertShapeToPath: true },
					{ convertStyleToAttrs: true },
					{ convertTransform: true },
					{ mergePaths: true },
					{ moveElemsAttrsToGroup: true },
					{ moveGroupAttrsToElems: true },
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeEditorsNSData: true },
					{ removeEmptyAttrs: true },
					{ removeEmptyContainers: true },
					{ removeEmptyText: true },
					{ removeHiddenElems: true },
					{ removeMetadata: true },
					{ removeNonInheritableGroupAttrs: true },
					{ removeRasterImages: true },
					{ removeTitle: true },
					{ removeUnknownsAndDefaults: true },
					{ removeUnusedNS: true },
					{ removeUselessStrokeAndFill: false }, // Enabling this may cause small details to be removed
					{ removeViewBox: false }, // Keep the viewBox because that's where illustrator hides the SVG dimensions
					{ removeXMLProcInst: false }, // Enabling this breaks grunticon because it removes the XML header
					{ sortAttrs: true },
					{ transformsWithOnePath: false } // Enabling this breaks Illustrator SVGs with complex text
				]
			},
			all: {
				files: [
					{
						cwd: '<%= config.dirs.src %>/img/',
						dest: '<%= config.dirs.dist %>/htdocs/img/',
						expand: true,
						ext: '.svg',
						src: ['**/*.svg']
					}
				]
			}
		},

		useminPrepare: {
			options: {
				dest: '<%= config.dirs.dist %>/htdocs'
			},
			html: '<%= config.dirs.src %>/index.html'
		},

		usemin: {
			html: ['<%= config.dirs.dist %>/*.html'],
		}

	});

	//grunt.loadTasks('grunt/_config.js');
	grunt.loadTasks('grunt');
	grunt.loadNpmTasks('assemble');

	grunt.registerTask('serve',
		'Starts a static webserver with livereload',
		function (target) {

			var tasks = [];

			if (target === 'dist') {
				return grunt.task.run(['build', 'connect:dist:keepalive']);
			} else if(target === 'dev') {
				tasks = ['dev', 'configureRewriteRules', 'connect:livereload', 'watch'];
			} else {
				tasks = ['build', 'configureRewriteRules', 'connect:livereload', 'watch'];
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
			'useminPrepare',
			//'bowerInstall',
			'sass:dev',
			'concat',
			'uglify',
			'cssmin',
			'autoprefixer',
			//'rev',
			'usemin',
			'newer:imagemin',
			//'clean:post'
		]
	);

	grunt.registerTask('build',
		'Build site files for deployment.',
		[
			'clean:pre',
			'copy:prod',
			'assemble',
			'useminPrepare',
			'bowerInstall',
			'sass:prod',
			'concat',
			'uglify',
			'cssmin',
			'autoprefixer',
			'compress:gzip',
			'rev',
			'usemin',
			'imagemin',
			'svgmin',
			'htmlmin',
			'replace:prod',
			'clean:post'
		]
	);

	grunt.registerTask('default', ['serve:dev']);

	// Alias tasks
	grunt.registerTask('stage', ['deploy:stage']);
	grunt.registerTask('publis', ['deploy:live']);

};

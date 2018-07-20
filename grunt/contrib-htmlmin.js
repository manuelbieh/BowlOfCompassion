module.exports = function(grunt) {


	// Using useminPrepare generated cssmin config

	grunt.config('htmlmin', {
        prod: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                expand: true,
                src: ['dist/**/*.html', '*.html'],
                dest: '.'
            }]
        }
	});

	//grunt.loadNpmTasks('grunt-contrib-cssmin');

}

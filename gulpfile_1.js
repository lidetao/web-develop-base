var gulp = require('gulp');
var contentIncluder = require('gulp-content-includer');
var rename = require('gulp-rename');

gulp.task('concat', function() {
	gulp.src("./content.html")
		.pipe(contentIncluder({
			includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
		}))()
		.pipe(rename('index.html'))
		.pipe(gulp.dest('t/'));
});
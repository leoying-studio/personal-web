var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function () {
	console.log('hello')
	return gulp.src('./../sass/public/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
	});
	gulp.task('sass:watch', function () {
	gulp.watch('./../sass/public/sass/*.scss', ['sass']);
});
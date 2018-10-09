const gulp = require("gulp");
const sass = require('gulp-sass');
const DEFAULT_PATH = './../public/sass/**/*.scss';
const OUTPUT_PATH = './../public/css/';

let output = function () {
	gulp.src(DEFAULT_PATH)
		.pipe(sass({outputStyle: 'expanded'}))
			.pipe(gulp.dest(OUTPUT_PATH))
}

gulp.task("default", function () {
	output();
});


gulp.task('sass:watch', function () {
	gulp.watch(DEFAULT_PATH, ['default']);
});


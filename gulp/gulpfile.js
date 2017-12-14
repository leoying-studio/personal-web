var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task("sass", function() {
    return gulp.src("./../public/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./*.css"));
});

gulp.task('watch', function () {   
	gulp.watch("./../public/sass/*.scss", ["sass"]);
});
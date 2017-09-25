var gulp = require('gulp')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')



gulp.task('compileSCSS',function(){
    gulp.src('src/scss/stylesheet.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/'));
});
gulp.task('uglifyJS',function(){
    gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('default', function(){
    gulp.start(['compileSCSS','uglifyJS']);  
    gulp.watch('src/scss/**/*.scss', ['compileSCSS']);
   gulp.watch('src/js/main.js', ['uglifyJS']);
});
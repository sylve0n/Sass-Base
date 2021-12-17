var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass')); //node sass is deprecated but async dart sass is too slow to use right now
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

const path = {
  sass: "scss/**/*.scss"
}

gulp.task('styles', function(){
  return gulp
    .src(path.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false,
        grid: 'no-autoplace'
      }),
      cssnano({ reduceIndents: false })
    ]))
  .pipe(gulp.dest("."));
})

gulp.task('dev', function() {
  return gulp
    .src(path.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("."));
})

gulp.task('watch', function(){
  gulp.watch(path.sass, gulp.series("dev"));
})
gulp.task('default', gulp.series('dev','watch'))
gulp.task('build', gulp.series('styles'))
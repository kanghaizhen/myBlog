var gulp = require("gulp"),
    stylus = require("gulp-stylus"),
    clean = require("gulp-clean");

gulp.task('stylus', ['clean'] ,function () {
  gulp.src('public/stylus/style.styl')
    .pipe(stylus({
        compress: true
      }))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('clean',function(){
  gulp.src('public/stylesheets/*')
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch('public/stylus/*.styl', ['stylus']);
});

// 默认任务
gulp.task('default', ['stylus','watch']);
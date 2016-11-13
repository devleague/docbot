const gulp = require('gulp');

const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const postcssEasyImport = require('postcss-easy-import');
const postcssNested = require('postcss-nested');

// magic string paths
const paths = {
  scssSrc: 'server/src/assets/css/app.css',
  scssSrcGlob: 'server/src/assets/css/**/*',
  cssDist: 'server/public/assets/css'
};

gulp.task('css', _ => {
  const processors = [
    postcssEasyImport({glob: true}),
    postcssNested
  ];

  return gulp.src(paths.scssSrc)
    .pipe(postcss(processors))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('watch', function (){
  gulp.watch(paths.scssSrcGlob, ['css']);
});

gulp.task('default', ['css', 'watch']);
gulp.task('build', ['css']);
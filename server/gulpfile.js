const gulp = require('gulp');

const postcss = require('gulp-postcss');
const postcssEasyImport = require('postcss-easy-import');
const postcssCssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const rucksack = require('rucksack-css');

// magic string paths
const paths = {
  scssSrc: 'src/assets/css/app.css',
  scssSrcGlob: 'src/assets/css/**/*',
  cssDist: 'dist/assets/css'
};

gulp.task('css', _ => {
  const processors = [
    postcssEasyImport({glob: true}),
    rucksack,
    postcssCssnext,
    postcssNested
  ];

  return gulp.src(paths.scssSrc)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('watch', function (){
  gulp.watch(paths.scssSrcGlob, ['css']);
});

gulp.task('default', ['css', 'watch']);

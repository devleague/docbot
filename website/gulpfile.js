var gulp = require('gulp');
var pug = require('gulp-pug');

var postcss = require('gulp-postcss');
var postcssEasyImport = require('postcss-easy-import');
var postcssCssnext = require('postcss-cssnext');
var postcssNested = require('postcss-nested');
var rucksack = require('rucksack-css');

gulp.task('html', function (){
  return gulp.src('src/html/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'));
})

gulp.task('css', function (){
  const processors = [
    postcssEasyImport({glob: true}),
    rucksack,
    postcssCssnext,
    postcssNested
  ];

  return gulp.src('src/assets/css/app.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/assets/css'));
})

gulp.task('watch', function (){
  gulp.watch('src/html/**/*.pug', ['html'])
  gulp.watch('src/assets/css/**/*', ['css'])
})

gulp.task('default', ['watch'])

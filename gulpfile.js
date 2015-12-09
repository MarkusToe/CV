var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var recess = require('gulp-recess');
var csslint = require('gulp-csslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var input = './stylesheets/*.scss';
var output = './public/css';
var cssInput = './public/css/*.css';
var imgInput = './public/img/*';
var imgOutput = './public/img';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
});

gulp.task('imageopt', function () {
  return gulp
    .src(imgInput)
    .pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(imgInput));
});

gulp.task('style-quality', function () {
    return gulp
      .src(cssInput)
      .pipe(recess())
      .pipe(recess.reporter())
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

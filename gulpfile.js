'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const sass = require('gulp-sass')
const minify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer')
//const concat = require('gulp-concat')

gulp.task('clean', function () {
  return gulp.src('./dist', {
      read: false
    })
    .pipe(clean())
})

gulp.task('minify', function () {
	return gulp.src('./src/js/**/*.js')
  .pipe(minify())
  .pipe(gulp.dest('./dist/js'))
})

gulp.task('sass', function () {
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({
	    browsers: ['last 2 versions'],
	    cascade: false
		}))
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('imagemin', function () {
  return gulp.src('./src/img/*')
	  .pipe(imagemin({
	    interlaced: true,
	    progressive: true,
	    svgoPlugins: [{
	        removeViewBox: false
	    }]
	  }))
	  .pipe(gulp.dest('./dist/img'))
})

gulp.task('build', ['clean', 'sass', 'minify', 'imagemin'], function () {})

gulp.task('dev', ['clean', 'sass', 'imagemin'], function () {
	browserSync.init({
    server: "./"
	})
	gulp.src('./src/fonts/*').pipe(gulp.dest('./dist/fonts'))
	gulp.watch('./src/scss/*.scss', ['sass']).on('change', browserSync.reload)
	gulp.watch('./index.html').on('change', browserSync.reload)
})

// gulp.task('default', function(){
// });

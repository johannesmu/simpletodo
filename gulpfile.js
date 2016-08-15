var gulp = require('gulp');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var browserSync = require('browser-sync').create();
var runsequence = require('run-sequence');
var imageresize = require('gulp-image-resize');

gulp.task('html',function(){
  return gulp.src('./templates/*.pug')
  .pipe(pug({pretty:true}))
  .pipe(browserSync.reload({
    stream: true
  }))
  .pipe(gulp.dest('build/www'));
});
gulp.task('less', function(){
	return gulp.src('./less/*.less')
		.pipe(less({plugins: [autoprefix, cleancss]}))
		.pipe(browserSync.reload({
		  stream: true
		}))
		.pipe(gulp.dest('build/www/css'));
});
gulp.task('copyjs', function() {
   return gulp.src('./js/*.js')
   .pipe(gulp.dest('build/www/js'));
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build/www'
    },
  })
});
gulp.task('watch',function(){
  runsequence('less','html','copyjs','icons','browserSync',function(e){
  });
  gulp.watch('templates/*.pug',['html']);
  gulp.watch('less/*.less',['less']);
  gulp.watch('js/*.js',['copyjs']);
});
gulp.task('icons',function(){
  runsequence('icon-hdpi','icon-ldpi','icon-mdpi','icon-xhdpi','logo',function(e){});
});
gulp.task('icon-hdpi',function(){
  gulp.src('icons/icon.png')
  .pipe(imageresize({width:72,height:72,crop:false,upscale:false}))
  .pipe(gulp.dest('build/platforms/android/res/drawable-hdpi'));
});
gulp.task('icon-ldpi',function(){
  gulp.src('icons/icon.png')
  .pipe(imageresize({width:36,height:36,crop:false,upscale:false}))
  .pipe(gulp.dest('build/platforms/android/res/drawable-ldpi'));
});
gulp.task('icon-mdpi',function(){
  gulp.src('icons/icon.png')
  .pipe(imageresize({width:48,height:48,crop:false,upscale:false}))
  .pipe(gulp.dest('build/platforms/android/res/drawable-mdpi'));
});
gulp.task('icon-xhdpi',function(){
  gulp.src('icons/icon.png')
  .pipe(imageresize({width:96,height:96,crop:false,upscale:false}))
  .pipe(gulp.dest('build/platforms/android/res/drawable-xhdpi'));
});
gulp.task('logo',function(){
  gulp.src('icons/icon.png')
  .pipe(imageresize({width:128,height:128,crop:false,upscale:false}))
  .pipe(gulp.dest('build/www/images'));
});

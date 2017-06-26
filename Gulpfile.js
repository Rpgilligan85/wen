var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

gulp.task('styles', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(cleanCSS({compatibility: '1e8'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(livereload());
});

var jsFiles = 'js/**.js',  
    jsFiles2 = 'js/plugins/**/*.js',  
    jsDest = 'dist/js';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(livereload());
});

gulp.task('plugins', function() {  
    return gulp.src(jsFiles2)
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});


gulp.task('watch', function(){
   livereload.listen();
   gulp.watch('sass/**/*.scss',['styles']) 
   gulp.watch('js/**/*.js',['scripts','plugins']) 
});

gulp.task('default', ['watch']);
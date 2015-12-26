var gulp 		= require('gulp');
// Gulp Plugin
var less 		= require('gulp-less');
var plumber		= require('gulp-plumber');
var iconfont	= require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
// Node Modules
var babelify 	= require('babelify');
var browserify  = require('browserify');
var source		= require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
// Compile Less Files
gulp.task('less', function() {
	gulp.src('./app/css/*.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('./app/css'));
});
// Compile ES6 Files
gulp.task("js", function () {
    var b = browserify({entries:"./app/js/main.js"});

    return b.bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source("app.js"))
        .pipe(gulp.dest('./app/js'));
});
// Serve the Server
gulp.task('serve', function() {
    browserSync.init({
        server: './app/'
    });
});
// Convert .svg to Icon Font
gulp.task('iconfont', function() {
	gulp.src(['./app/icons/*.svg'])
		.pipe(iconfont({
			fontName: 'rps-iconfont',
			appendUnicode: true,
			formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
			normalize: true
		}))
		.on('glyphs', function(glyphs, options) {
			var options = {
	        	glyphs: glyphs.map(function(glyph) {
	          		return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
	        	}),
	        	fontName: 'rps-iconfont',
	        	fontPath: '../fonts/',
	        	className: 'icon'
	      	};
	      	gulp.src('./app/fonticon.css')
	      		.pipe(consolidate('lodash', options))
	        	.pipe(gulp.dest('./app/css/components/'));
		})
		.pipe(gulp.dest('./app/fonts/'));
});
// Watch for Changes
gulp.task('watch', ['serve'], function() {
    gulp.watch('./app/index.html').on('change', browserSync.reload);
    gulp.watch('./app/css/**/*.less', ['less']).on('change', browserSync.reload);
    gulp.watch('./app/css/**/*.css').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js', ['js']).on('change', browserSync.reload);
});

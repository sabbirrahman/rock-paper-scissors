var gulp 		= require('gulp');
var less 		= require('gulp-less');
var iconfont	= require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var browserSync = require('browser-sync').create();

gulp.task('less', function() {
	gulp.src('./app/css/*.less')
		.pipe(less())
		.pipe(gulp.dest('./app/css'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: './app/'
    });
});

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

gulp.task('watch', ['serve'], function() {
    gulp.watch('./app/**/*.less', ['less']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
    gulp.watch('./app/**/*.css').on('change', browserSync.reload);
    gulp.watch('./app/**/*.js').on('change', browserSync.reload);
});

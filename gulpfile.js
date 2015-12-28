var gulp 		 = require('gulp');
// Gulp Plugin
var less 		 = require('gulp-less');
var plumber		 = require('gulp-plumber');
var iconfont	 = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
//Less Plugins
var LPCleanCSS   = require('less-plugin-clean-css');
var LPAutoPrefix = require('less-plugin-autoprefix');
var cleancss  	 = new LPCleanCSS({ advanced: true });
var autoprefix   = new LPAutoPrefix({ browsers: ["last 5 versions"] });
// Node Modules
var del		 	 = require('del');
var uglifyify	 = require('uglifyify');
var browserify   = require('browserify');
var runSequence  = require('run-sequence');
var source		 = require('vinyl-source-stream');
var browserSync  = require('browser-sync').create();
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
        server: './app'
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


// Build Production
gulp.task('build-clean', function() {
	return del('./dist/**/*');
});
gulp.task('build-less', function() {
	return gulp.src('./app/css/*.less')
		.pipe(plumber())
		.pipe(less({
    		plugins: [autoprefix, cleancss]
 		}))
		.pipe(gulp.dest('./dist/css'));
});
gulp.task("build-script", function () {
    var b = browserify({entries:"./app/js/main.js"})
    		.transform({
  				global: true
			}, 'uglifyify');

    return b.bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source("app.js"))
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('copy-fonts', function() {
	return gulp.src('./app/fonts/*.{ttf,eot,svg,woff,woff2}')
   		.pipe(gulp.dest('./dist/fonts'));
});
gulp.task('copy-img', function() {
	return gulp.src('./app/img/*.{jpg,png}')
   		.pipe(gulp.dest('./dist/img'));
});
gulp.task('copy-root', function() {
	return gulp.src([
		'./app/index.html',
		'./app/favicon.ico'
		])
   		.pipe(gulp.dest('./dist'));
});
gulp.task('build', ['build-clean'], function(){
	return runSequence([
		'build-less',
		'build-script',
		'copy-img',
		'copy-fonts',
		'copy-root'
	]);
});
// Serve the Build at http://localhost:8080
gulp.task('serve-build', function() {
	browserSync.init({
        server: './dist/',
        port: 8080,
        ui: false
    });
});
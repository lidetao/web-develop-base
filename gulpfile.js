/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-content-includer gulp-htmlmin --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
	imagemin = require('gulp-imagemin'), //图片压缩
	sass = require('gulp-ruby-sass'), //sass
	minifycss = require('gulp-minify-css'), //css压缩
	jshint = require('gulp-jshint'), //js检查
	uglify = require('gulp-uglify'), //js压缩
	rename = require('gulp-rename'), //重命名
	concat = require('gulp-concat'), //合并文件
	htmlmin = require("gulp-htmlmin"), //html代码压缩
	contentIncluder = require('gulp-content-includer'), //html文件嵌入组合
	clean = require('gulp-clean'); //清空文件夹

//================================================================
/*
 * 项目全局操作
 */
// 清空编译包(dist)下的图片、样式、js
gulp.task('dist:clean', function() {
	gulp.src(['./dist/css', './dist/js', './dist/images'], {
			read: false
		})
		.pipe(clean());
});
//================================================================

//================================================================
/*
 * html文件操作
 */
//HTML文件嵌入组合
gulp.task('html:includer', function() {
	gulp.src("./src/content.html")
		.pipe(contentIncluder({
			includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./dist/'));

});
//HTML文件内容压缩
gulp.task('html:minify', function() {
	gulp.src('./dist/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist/'));
});
//================================================================

//================================================================
/*
 * js文件操作
 */
//js验证
gulp.task('js:jshint', function() {
	gulp.src('./src/js/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'));
});
//js文件合并
gulp.task("js:concat", function() {
	gulp.src('./src/js/*.js')
		.pipe(concat('index.js'))
		.pipe(gulp.dest('./dist/js/'));
});
//js文件代码压缩
gulp.task("js:minify", function() {
	gulp.src('./src/js/*.js')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});
//================================================================

//================================================================
/*
 *css文件操作 
 */
//css文件合并
gulp.task("css:concat", function() {
	gulp.src('./src/css/*.css')
		.pipe(concat('index.css'))
		.pipe(gulp.dest('./dist/css/'));
});
//css文件代码压缩
gulp.task("css:minify", function() {
	gulp.src('./src/css/*.css')
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('./dist/css/'));
});
//================================================================

//================================================================
/*
 * sass编译
 */
gulp.task("sass:compile", function() {
	sass('./src/scss/*.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('./dist/css/'));
});
//================================================================

//================================================================
/*
 * 图片处理
 */
//图片压缩
gulp.task('images:minify', function() {
	gulp.src('./src/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'));
});
//================================================================

//================================================================
// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['dist:clean'], function() {
	gulp.start('html:includer', 'sass:compile');
});
//================================================================
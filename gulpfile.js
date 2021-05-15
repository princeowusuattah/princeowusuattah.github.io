var gulp 			= require("gulp");
var pug 			= require("gulp-pug");
var sass 			= require("gulp-sass");
var postcss 		= require("gulp-postcss");
var autoprefixer 	= require("autoprefixer");
var perfectionist 	= require("perfectionist");
var plumber 		= require("gulp-plumber");
var notify 			= require("gulp-notify");
var concat 			= require("gulp-concat")
var beautify 		= require("gulp-html-beautify");
var tinypng 		= require('gulp-tinypng');

var src = "./src/";
var dist = "./dist/";

// Pug
gulp.task("pug", function() {
	return gulp.src([src + "pug/*.pug", "!" + src + "pug/layout/*.pug"])
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(pug({
			pretty: "\t"
		}))
		.pipe(gulp.dest(dist))
});

// Sass
gulp.task("sass", function() {
	var processors = [
		autoprefixer,
		perfectionist
	];
	return gulp.src([src + "sass/*.sass"])
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(gulp.dest(dist + "css"))
});

// Concat JS
gulp.task("concatjs", function() {
	return gulp.src([src + 'js/*.js', '!' + src + 'js/functions.js'])
		.pipe(concat('plugins.min.js'))
		.pipe(gulp.dest(dist + 'js'))
});

// HTML beutify
gulp.task("beautify", function() {
	return gulp.src([dist + '*.html'])
		.pipe(beautify({
			indent_char: '\t',
            indent_size: 1
		}))
		.pipe(gulp.dest(dist))
});

// Imagemin
gulp.task('tinypng', function() {
    return gulp.src(src + 'img/**/*.png')
        .pipe(tinypng("YOUR_API"))
        .pipe(gulp.dest(dist + 'img'))
});

gulp.task("watch", function() {
	gulp.watch(src + "pug/*.pug", ["pug"]);
	gulp.watch(src + "sass/*.sass", ["sass"]);
});

gulp.task("default", ["pug", "sass", "concatjs", "watch"]);

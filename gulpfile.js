var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	runSequence = require("run-sequence"),
	opn = require("opn"),
	pkg = require('./package.json')

var comment = '/*\n' +
	' * <%= pkg.name %> <%= pkg.version %>\n' +
	' * <%= pkg.description %>\n' +
	' * Copyright 2018, <%= pkg.author %>\n' +
	' * Released under the <%= pkg.license %> license.\n' +
	'*/\n\n';

gulp.task("uglify", function () {
	var src = "./src/",
		dest = "./dist"
	return gulp.src(src + "jquery.oninput.polyfill.js")
		.pipe($.uglify({
			mangle: {
				reserved: ["require", "module", "exports"]
			}
		}))
		.pipe($.banner(comment, {
			pkg: pkg
		}))
		.on('error', function (err) { // uglify 报错信息
			$.util.log($.util.colors.red('[Error]'), err.toString());
		})
		.pipe(gulp.dest(dest))
		.pipe($.size({
			title: "js uglify: "
		}))
})

gulp.task("server:dev", function (done) {
	$.connect.server({
		root: './',
		livereload: true,
		port: 8888
	})
	opn("http://localhost:8888/demo/")
})

gulp.task("test", function (done) {
	$.connect.server({
		root: './',
		port: 8889
	})
	opn("http://localhost:8889/test/on-input-change.html")
})

gulp.task("watch", function () {
	return $.watch([
		"./src/*.*",
		"./demo/*.*"
	], function (files) {
		console.log("File " + files.path + " was " + files.event + ", running tasks...")
		runSequence("uglify", "livereload")
	})
})

gulp.task("livereload", function () {
	gulp.src([
		"./demo/*.*"
	]).pipe($.connect.reload())

})

gulp.task("default", function (cb) {
	runSequence(["uglify", "server:dev", "watch"], cb)
})
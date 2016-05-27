gulp = require "gulp"
gutil = require "gulp-util"
connect = require "gulp-connect-php"
browserSync = require("browser-sync").create()

gulp.task "server", ->
	browserSync.init
		files: ["dist/**/*"]
		open: !!gutil.env.open
		reloadOnRestart: true
		port: gutil.env.port or 8000
		server:
			baseDir: ["dist"]

gulp.task 'php', ->
	connect.server base: './dist/', port: '9000', ->
		browserSync.init
			files: ["dist/**/*"]
			reloadOnRestart: true
			open: no
			port: '8000'
			# proxy: "http://wfb7927c.bget.ru/"
			proxy: "127.0.0.1:9000"
			# proxy: 'http://elektro.hostfor.ru'
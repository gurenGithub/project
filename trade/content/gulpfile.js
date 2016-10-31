var gulp     	 = require('gulp'),
	uglify       = require('gulp-uglify'),
	less         = require('gulp-less'),
	jshint       = require('gulp-jshint'),
	cssmin       = require('gulp-cssmin'),
	watch        = require('gulp-watch'),
	gutil        = require('gulp-util'),
	autoprefixer = require('gulp-autoprefixer'),
	async        = require('async'),
	beeper       = require('beeper'),
	gulpif       = require('gulp-if'),
	browserSync  = require('browser-sync').create(),
	makeUrlVer   = require('gulp-make-css-url-version');

gulp.task('build', function() {
	async.series([function(next){
		// copy files
		gulp.src([
				'src/**/*', 
				'!src/**/*.less', 
				'!src/**/*.map'])
			.pipe(gulp.dest('dist'))
			.on('error', function(e){
	            console.log(e);
	         })
			.on('end', function(){
				console.log('done Copy files');
				next();
			});
	}, function(next){
		// build less to src
		gulp.src([
				'src/less/**/*.less', 
				'!sprite.less', 
				'!src/less/tools/*'])
			.pipe(less())
			.pipe(autoprefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
			.pipe(gulp.dest('src/css'))
			.on('end', function(){
				console.log('done build less to src');
				next();
			});
	}, function(next){
		// build js to dist
		gulp.src([
				'src/js/**/*.js', 
				'!src/**/*min*.js', 
				'!src/js/vendor/ng/**/*', 
				'!src/js/directivesV2.js'])
			.pipe(uglify().on('error', gutil.log))
			.pipe(gulp.dest('dist/js'))
			.on('end', function(){
				console.log('done build js to dist');
				next();
			});
	}, function(next){
		// build css to dist
		gulp.src('src/**/*.css')
			.pipe(cssmin())
			// .pipe(gulpif(/css\/[\w-]+\.css/, makeUrlVer({
   //          	assetsDir: __dirname + '/dist/img'
   //      	})))
			.pipe(gulp.dest('dist/'))
			.on('end', function(){
				console.log('done build css to dist');
				next();
			});
	}]);
	
});

gulp.task('less', function(){
	gulp.watch(['src/less/**/*.less', 'src/js/**/*.css', 'src/less/**/*.css'], function(){
		var d = new Date;
		console.log('Compiled at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
		gulp.src(['src/less/**/*.less', '!src/less/tools/*'])
			.pipe(less())
			.pipe(autoprefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
			.pipe(gulp.dest('src/css'))
			.pipe(browserSync.stream());
	});
});


gulp.task('jshint', function(){
	Hintjs();
});

gulp.task('appBuild', function(cb){
	async.series([
		function (next) {
			// copy files
			gulp.src(['src/App/**/*', '!src/**/*.less', '!src/**/*.css', '!src/**/*.js'])
				.pipe(gulp.dest('App'))
				.on('end', next);
		},
		function (next) {
			// app src less 2 app src css
			gulp.src('src/App/less/**/*.less')
				.pipe(less())
				.pipe(autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
		        }))
				.pipe(gulp.dest('src/App/css'))
				.on('end', next);
		},
		function (next) {
			// minify css
			console.log("begin minifyCss");
			gulp.src('src/App/css/**/*.css')
				.pipe(cssmin())
				.pipe(gulp.dest('App/css'))
				.on('end', function(){
					console.log('done minifyCss');
					next();
		    	});
		},
		function (next) {
			// hint js
			gulp.src(['src/App/**/*.js', '!src/**/*.min.js', '!src/**/*-min.js'])
				.pipe(jshint('.jshintrc'))
		    	.on('end', function(){
		    		console.log('done hintjs');
		    		next();
		    	})
		    	.pipe(jshint.reporter('jshint-stylish'))
		    	.pipe(jshint.reporter('fail'));
		},
		function (next) {
			// minify js
			gulp.src(['src/App/js/**/*.js'])
				.pipe(uglify())
				.pipe(gulp.dest('App/js'))
				.on('end', function(){
					console.log('done minifyJs');
					next();
		    	});
		}
	], cb);

	
});

gulp.task('copyFiles', function(){
	copyFiles();
});

var copyFiles = function(next){
	console.log("begin copyFiles");

	gulp.src(['src/**/*', '!src/**/*.css', '!src/**/*.js'])
		.pipe(gulp.dest('dist'))
		.on('end', function(){
			console.log('done copyFiles');
			if(next) {next();}
		});
};

var Hintjs = function(next){
	console.log("begin hintjs");
	gulp.src(['src/js/**/*.js', '!src/js/vendor/**/*.js', '!src/**/*.min.js', '!src/**/*-min.js', '!src/js/slick/*'])
		.pipe(jshint('.jshintrc'))
    	.on('end', function(){
    		console.log('done hintjs');
    		if(next) {
    			next();
    		}
    	})
    	.pipe(jshint.reporter('jshint-stylish'))
    	.pipe(jshint.reporter('fail'));
};

var minifyJs = function(next){
	console.log("begin minifyJs");
	gulp.src(['src/js/**/*.js', '!src/js/vendor/**/*.js', '!src/**/*.min.js', '!src/**/*-min.js', '!src/js/slick/*'])
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.on('end', function(){
			console.log('done minifyJs');
    		if(next) {
    			next();
    		}
    	});
};

var minifyCss = function(next){
	console.log("begin minifyCss");
	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('css'))
		.on('end', function(){
			console.log('done minifyCss');
    		if(next) {
    			next();
    		}
    	});
};

var buildLess2Src = function(next){
	console.log("begin buildLess2Src");
	gulp.src('src/less/**/*.less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('src/css'))
		.on('end', function(){
			console.log('done buildLess2Src');
    		if(next) {
    			next();
    		}
    	});
};




gulp.task('serve', ['less'], function() {

    browserSync.init({
        proxy: "192.168.31.102:81"
    });

    gulp.watch(["src/js/**/*.js", "src/**/*.html", "html/**/*.html"]).on('change', browserSync.reload);
});

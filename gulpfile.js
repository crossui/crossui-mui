/** 切记：
 * 在所有任务中gulp.src前面加上return
 * 在任务之前先建立 config.js
 */


/**
 * 全局变量集
 */
var gulp        = require('gulp'),                                  // gulp
    sass        = require('gulp-sass'),                             // gulp-sass
	//sourcemaps	= require('gulp-sourcemaps'),            			// sass maps
    cssmin      = require('gulp-minify-css'),                       // css min
    csslint     = require('gulp-csslint'),       	                // 检查css的语法错误。
	csscomb    	= require('gulp-csscomb'),							// 格式化css代码，美化css代码，更容易阅读。
    notify      = require('gulp-notify'),                           // watch 监听 错误提示
    plumber     = require('gulp-plumber'),                          // watch 出现异常并不终止监听
    //rev         = require('gulp-rev-append'),                       // 给URL自动添加MD5版本号 (注： 将html和css中包含url,src等资源链接加上 ?v=@@hash )
	uglify		= require('gulp-uglify'),							// 压缩javascript文件，减小文件大小。
	concat		= require('gulp-concat'),							// 合并javascript文件，减少网络请求。
	rename 		= require('gulp-rename'),							// 重命名
	//jshint		= require('gulp-jshint'),							// js代码检测
	browserSync = require('browser-sync').create(),					// 自动刷新，释放你的F5
	base64 		= require('gulp-base64'),							// 图片转换成Base64编码
	size 		= require('gulp-size'),								// 显示文件大小
	clean		= require('gulp-clean'),							// 删除文件和文件夹		
	//spritesmith = require('gulp.spritesmith'),						// CSS Sprites	
	run         = require('run-sequence'),							// 按顺序执行任务
	changed		= require('gulp-changed'),							// 实现文件拷贝--只拷贝变动过的文件
    header      = require('gulp-header'),                           // 头注释
    stylish 	= require('jshint-stylish');						// js压缩过中错误的提示
	
	//path
	//yargs
	//fs
	//gulp-tap
	//gulp-cssnano
	//gulp-postcss
	//autoprefixer

/**
 * 版本
 */
var version = 'v3.4.0';
/**
 * 文件路径
 */
var Asset = {
    muijs: {
        'watch':'./src/js/**/*.js',
        'src':[
            //common
            './src/js/mui.js',
            './src/js/mui.detect.js',
            './src/js/mui.detect.5+.js',
            './src/js/mui.event.js',
            './src/js/mui.target.js',
            './src/js/mui.fixed.js',
            './src/js/mui.fixed.bind.js',
            './src/js/mui.fixed.classlist.js',
            './src/js/mui.fixed.animation.js',
            './src/js/mui.fixed.fastclick.js',
            './src/js/mui.fixed.keyboard.js',
            './src/js/mui.namespace.js',
            './src/js/mui.gestures.js',
            './src/js/mui.gestures.flick.js',
            './src/js/mui.gestures.swipe.js',
            './src/js/mui.gestures.drag.js',
            './src/js/mui.gestures.tap.js',
            './src/js/mui.gestures.longtap.js',
            './src/js/mui.gestures.hold.js',
            './src/js/mui.gestures.pinch.js',
            './src/js/mui.init.js',
            './src/js/mui.init.5+.js',
            './src/js/mui.back.js',
            './src/js/mui.back.5+.js',
            './src/js/mui.init.pullrefresh.js',
            './src/js/mui.ajax.js',
            './src/js/mui.ajax.5+.js',
            './src/js/mui.layout.js',
            './src/js/mui.animation.js',
            './src/js/mui.class.js',
            './src/js/mui.pullRefresh.js',
            './src/js/mui.class.scroll.js',
            './src/js/mui.class.scroll.pullrefresh.js',
            './src/js/mui.class.scroll.slider.js',
            './src/js/pullrefresh.5+.js',
            './src/js/mui.offcanvas.js',
            './src/js/actions.js',
            './src/js/modals.js',
            './src/js/popovers.js',
            './src/js/segmented-controllers.js',
            './src/js/switches.js',
            './src/js/tableviews.js',
            './src/js/mui.dialog.alert.js',
            './src/js/mui.dialog.confirm.js',
            './src/js/mui.dialog.prompt.js',
            './src/js/mui.dialog.toast.js',
            './src/js/mui.dialog.loading.js',
            './src/js/mui.popup.js',
            './src/js/mui.progressbar.js',
            './src/js/input.plugin.js',
            './src/js/mui.transparent.js',
            './src/js/mui.number.js',
            './src/js/mui.button.js',
            //plugin
            './src/js/plugin/mui.picker.js',
            './src/js/plugin/mui.pullToRefresh.js',
            './src/js/plugin/mui.pullToRefresh.material.js',
            //'./src/js/plugin/feedback.js'
            './src/js/plugin/mui.zoom.js',
            './src/js/plugin/mui.previewimage.js',
            './src/js/plugin/mui.indexedlist.js',
            './src/js/plugin/mui.lazyload.js',
            './src/js/plugin/mui.lazyload.img.js',
            './src/js/plugin/mui.locker.js',
            './src/js/plugin/mui.view.js',
            //libs
            './src/js/libs/bscroll.js'
        ],
        'dist' :'./dist/js'
    },
    muicss:  {
        'watch': './src/sass/**/*.scss',
        'src':[
            //common
            './src/sass/mui.scss',
            //plugin
            './src/sass/plugin/mui.picker.scss',
            './src/sass/plugin/icons-extra.scss',
            //'./src/sass/plugin/feedback.scss'
            './src/sass/plugin/previewimage.scss',
            './src/sass/plugin/mui.indexedlist.scss'
        ],
        'dist' :'./dist/css/'
    },
    html: [

    ],
    libs: {
        'src':'./src/libs/**',
        'dist':'./dist/libs'
    },
    docs: {
        'src':'./src/docs/*',
        'dist':'./dist/docs'
    },
    fonts: {
        'src':'./src/fonts/**',
        'dist':'./dist/fonts'
    },
    images: {
        'src':'./src/images/**',
        'dist':'./dist/images'
    },
    json: {
        'src':'./src/json/**',
        'dist':'./dist/json'
    }
};


//测试gulp是否正常运行 gulp hello
gulp.task('hello',function(){
	console.log('hello world');
});

/**
 * mui.css
 */
gulp.task('muicss', function () {
    var banner = '/*! + Mui '+ version + ' */\n';
    return gulp.src(Asset.muicss.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(header(banner))
            //.pipe(csslint())
            //.pipe(csslint.formatter())
            .pipe(csscomb())
            .pipe(concat('mui.css'))
            .pipe(gulp.dest(Asset.muicss.dist));
});
gulp.task('muicssMin', function () {
    return gulp.src(Asset.muicss.dist+'mui.css')
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(Asset.muicss.dist));
});


/**
 * mui.js
 */
gulp.task('muijs',function(){
    gulp.src(Asset.muijs.src)
        .pipe(concat('mui.js'))				        //合并后的文件名
        //.pipe(jshint())                             //先进行检测
        .pipe(uglify())                             //JS压缩
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(Asset.muijs.dist));
});

/**
 * mui fonts
 */
gulp.task('fonts',function(){
    gulp.src(Asset.fonts.src)
        .pipe(changed(Asset.fonts.dist))
        .pipe(gulp.dest(Asset.fonts.dist))
        .pipe(size());
});

/**
 * mui images
 */
gulp.task('images',function(){
    gulp.src(Asset.images.src)
        .pipe(changed(Asset.images.dist))
        .pipe(gulp.dest(Asset.images.dist))
        .pipe(size());
});

/**
 * libs
 */
gulp.task('libs',function(){
    gulp.src(Asset.libs.src)
        .pipe(changed(Asset.libs.dist))
        .pipe(gulp.dest(Asset.libs.dist))
        .pipe(size());
});

/**
 * docs
 */
gulp.task('docs',function(){
    gulp.src(Asset.docs.src)
        .pipe(changed(Asset.docs.dist))
        .pipe(gulp.dest(Asset.docs.dist))
        .pipe(size());
});

/**
 * json
 */
gulp.task('json',function(){
    gulp.src(Asset.json.src)
        .pipe(changed(Asset.json.dist))
        .pipe(gulp.dest(Asset.json.dist))
        .pipe(size());
});

/**
 * 项目开发进行时 执行的默认任务。
 */
gulp.task('start', function(){
    run('muicss', 'muicssMin', 'muijs', 'libs', 'docs','fonts','images','json');  //事先执行任务
    // Watch mui.css files
    gulp.watch(Asset.muicss.watch, ['muicss','muicssMin']);

    // Watch mui.js files
    gulp.watch(Asset.muijs.watch, ['muijs']);

    // Watch libs files
    gulp.watch(Asset.libs.src, ['libs']);

    // Watch docs files
    gulp.watch(Asset.docs.src, ['docs']);

    // Watch fonts files
    gulp.watch(Asset.fonts.src, ['fonts']);

    // Watch images files
    gulp.watch(Asset.images.src, ['images']);


    /* 静态服务
     */
    browserSync.init([Asset.muicss.dist, Asset.muijs.dist, Asset.libs.dist, Asset.docs.dist, Asset.fonts.dist, Asset.images.dist], {
        // 代理模式
        //proxy: "192.168.137.44:8181/work/troops/UPUPW/htdocs/mui/"
		server: {
            baseDir: "./dist/"
        }
    });
});

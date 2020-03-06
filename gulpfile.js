const gulp = require('gulp')

// html压缩
const htmlmin = require('gulp-htmlmin')

//css压缩
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const autoPrefixer = require('gulp-autoPrefixer')

//js压缩
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

//webserver
const webserver = require('gulp-webserver')

//del
const del = require('del')

//打包html的方法
const htmlHandler = () => {
    return gulp
        .src('./src/pages/*.html')
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeAttributeQuotes: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/pages'))
}

//打包css的方法
const cssHandler = () => {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}

//打包js的方法
const jsHandler = () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

//移动img的方法
const imgHandler = () => {
    return gulp
        .src('./src/images/**')
        .pipe(gulp.dest('./dist/images'))
}

//移动lib的方法
const libHandler = () => {
    return gulp
        .src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}

//删除dist的方法
const delHandler = () => {
    return del(['./dist'])
}

//配置服务
const serverHandler = () => {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: 'localhost',
            port: 8080,
            open: './pages/index.html',
            livereload: true,
            proxies: [{
                source: '/login',
                target: 'http://127.0.0.1/login.php'
            }, {
                source: '/okbuy_index',
                target: 'http://www.okbuy.com/ajax/homepage/index',
            }, {
                source: '/kaola_index',
                target: 'https://pages.kaola.com/pages/region/detail/15075/60021/263157.html'
            },{
                source:'/datail_test',
                target:'http://www.okbuy.com/ajax/detail/product_info/17827938'
            }]
        }))
}

//监听文件方法
const watchHandler = () => {
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/sass/*.scss', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/images/**', imgHandler)
    gulp.watch('./src/lib/**', libHandler)
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(htmlHandler, cssHandler, jsHandler, imgHandler, libHandler),
    serverHandler,
    watchHandler
)
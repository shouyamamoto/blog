const gulp = require('gulp');
const sass = require('gulp-sass');

// パーシャルを一括管理
const sassGlob = require('gulp-sass-glob');

// エラーがでても監視を続行
const plumber = require('gulp-plumber');

// エラー時に通知
const notify = require('gulp-notify');

// ベンダープレフィックスを自動付与
const autoprefixer = require('gulp-autoprefixer');

// 書き出したファイル名をリネームする
const rename = require('gulp-rename');

// jsの圧縮
const babel = require('gulp-babel');

// htmlの圧縮
const htmlmin = require('gulp-htmlmin');

const { src, dest, watch } = require('gulp');


// sassコンパイル
function cssTask() {
    return src('./src/sass/**/**', {sourcemaps: true})
        .pipe(sassGlob())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(autoprefixer({cascade: false}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('dist/css/', {sourcemaps: true}))
}

// jsコンパイル
function jsTask() {
    return src('./src/js/**', {sourcemaps: true})
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        // .pipe(rename({extname: '.min.js'}))
        .pipe(dest('dist/js/', {sourcemaps: true}))
}

//htmlのコンパイル
function htmlTask() {
    return src('./src/html/**')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/html'))
}

const keiryoWatch = () => {
    watch('./src/sass/**', cssTask)
    watch('./src/js/**', jsTask)
    watch('./src/html/**', htmlTask)
}
exports.keiryoWatch = keiryoWatch;

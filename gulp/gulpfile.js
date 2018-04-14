// gulp引入
const gulp = require('gulp');
// gulp插件加载引入
const plugins = require('gulp-load-plugins')();
// 浏览器实时刷新
const browsersSync = require('browser-sync').create()
//
const map = require('map-stream')

// gulp.task('default',function(){
//   console.log('hello world');
// })

// var autoprefixer = new plugins.lessAutoprefix({
//   browsers: [
//     'ie >= 8',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23'
//   ]
// });


// const customerReporter = map(function(file, cb) {
//   if (!file.jshint.success) {
//     //打印出错误信息
//     console.log("jshint fail in:" + file.path);
//     file.jshint.results.forEach(function(err) {
//       if (err) {
//         console.log(err);
//         console.log("在 " + file.path + " 文件的第" + err.error.line + " 行的第" + err.error.character + " 列发生错误");
//       }
//     });
//   }
// });

gulp.task('less', function() {
  gulp.src(['./src/**/*.less'])
    .pipe(plugins.sourcemaps.init())                              // sourcemaps初始化
    .pipe(plugins.less())                                         // less编译
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))                                                           // 自动加入前后缀
    .pipe(plugins.cleanCss())
    // .pipe(plugins.rename('hello.css'))
    .pipe(plugins.rename(function(path) {
      path.dirname = path.dirname.replace('less', 'css');
      // path.basename = path.basename + 'basename';
      // path.extname = '.min.css';
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./static'));
  browsersSync.reload();
})

gulp.task('lint', function() {
  gulp.src(['./src/**/*.js'])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.jshint())
    // .pipe(customerReporter)
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    // .pipe(plugins.concat('all.js'))
    // .pipe(plugins.rename('all.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(function(path) {
      path.extname = '.min.js';
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./static'));
})


gulp.task('default', ['less', 'lint'], function() {
  browsersSync.init(null, {
    // proxy: 'localhost:8070'
    server: {
      baseDir: './', // 设置服务器的根目录
      index: 'src/html/index.html' // 指定默认打开的文件
    },
    port: 8050 // 指定访问服务器的端口号
  });
  // 监听JS文件变化
  gulp.watch('./src/**/*.js', function() {
    gulp.run('lint', 'less'); //多个任务就直接往后加即可
  });
  // 监听less文件变化
  gulp.watch('./src/**/*.less', function() {
    gulp.run('lint', 'less');
  });
})

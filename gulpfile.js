var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

gulp.task('js', function () {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
            'dist/js/**/*.js'
        ])
        .pipe(plugins.concat('main.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('scss', function () {
    return gulp.src([
        'bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        'dist/scss/**/*.scss'])
        .pipe(plugins.scss())
        .pipe(plugins.concat('main.min.css'))
        .pipe(plugins.uglifycss())
        .pipe(plugins.cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('img', function() {
    return gulp.src('dist/img/**/*.*')
        .pipe(gulp.dest('public/img'));
});

gulp.task('fonts', function() {
    return gulp.src('dist/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('default', ['js', 'scss', 'img', 'fonts']);

gulp.task('watcher', function() {

    var watcher = gulp.watch(
        'dist/**/**.*',
        ['default']
    );
    watcher.on('change', function(event) {
        console.log('Event type: ' + event.type);
        console.log('Event path: ' + event.path);
    });
});
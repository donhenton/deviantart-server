var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var tap = require('gulp-tap');
var nodemon = require('gulp-nodemon');
var path = require('path');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var reportError = new require('./app/utils/utils')().reportError;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var reactify = require('reactify');


var appDependencies = require('./package.json').dependencies;
var buildDir = '.';
var publicDir = buildDir + '/public';
global._publicDir = publicDir;

/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:3000';

/**
 * 
 * task for pre compiling sass
 */
gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            // .pipe(uglifycss())
            .pipe(gulp.dest('./public_html/css/'))
            .on('finish', function ( ) {
                gutil.log("processing change in css");
                   livereload.reload(pageURL);
            });

});


gulp.task('build-react', function () {
    
    var reactBundler = browserify({
        entries: ['./front-end/react/app.js'],
        transform: ["babelify", {"presets": ["es2015","react"]}],
        extensions: ['.js'],
        debug: true,
        
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    function reactBundle() {
        return reactBundler
                .bundle()
                .on('error', reportError);

    }
    reactBundle()
            .pipe(source('bundle.js'))
            //.pipe(streamify(uglify()))
            .pipe(gulp.dest('public/js/react'));
    
    
    
    
});


gulp.task('react-backend', function () {

    livereload.listen();
    var reactPageUrl = 'http://localhost:3000/restaurantReact.doc';
    

    nodemon(
            {
                script: 'server.js',
                 
                // watch: ['*.js'],
                ext: 'js css ejs jsx',
                ignore: ['./gulpfile.js'],
                tasks: function (changedFiles)
                {
                    var tasks = [];
                  
                    changedFiles.forEach(function (file)
                    {
                        gutil.log(path.basename(file));
                        
                        //

                    });

                    return tasks;

                }

            }).on('restart', function ()
    {
        gutil.log('react restarted!');
        livereload.reload(reactPageUrl);
        livereload.reload(reactPageUrl);
         
    });
});









 
/**
 * task for reloading for backend, eg route changes
 * takes 3-4 seconds, will also pick up public css and js
 * but is slower for refresh compared to frontend task for css and public js
 */
gulp.task('backend', function () {

    livereload.listen();

    nodemon(
            {
                script: 'server.js',
                ext: 'js ejs',
                ignore: ['./gulpfile.js','./front-end/**/*.js','./public_html/js/**/*.js'],
                tasks: function (changedFiles)
                {
                    var tasks = [];
                    changedFiles.forEach(function (file)
                    {
                        gutil.log("file "+ path.dirname(file)+" "+/views/.test(path.dirname(file)) );
                        if (path.extname(file) === '.js' && /react/.test(path.dirname(file))    && !~tasks.indexOf('react'))
                        {
                          console.log("react js file")
                        }
                         
                        //

                    });

                    return tasks;

                }

            }).on('restart', function ()
    {
        gutil.log('restarted!');
        livereload.reload(pageURL);
        livereload.reload(pageURL);
         
    });
});
/* end backend task ------------------------------------- */
/* begin frontend task ---------------------------------- */
/*
 * 
 * this is a monitoring task which watch changes that DON'T
 * involve server reboot, so will be faster on refresh
 */

var watchItems = ['./views/**/*.ejs', './public/**/*.js', './public/**/*.css'];

/*
 * start server
 */
gulp.task('server-start', function (cb) {
    exec('node ./server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('frontend-watch', function () {

    livereload.listen();

    watch(watchItems, function (events, done) {


        console.log("processing change in watched items");
        livereload.reload(pageURL);


    });

 

});

gulp.task('frontend', ['server-start', 'frontend-watch']);

/* end fronend task ---------------------------------------- */



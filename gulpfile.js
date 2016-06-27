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

var notify = require("./build_utils/build_utils").notify;
var targetLocation = './public_html/'
var appDependencies = require('./package.json').dependencies;
var REACT_FILES = [ './front-end/react/**/*.js'];
var SASS_FILES = [ './sass/**/*.scss']; 
 

/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:3000';


var sassProcess =
        
            
            function () {
                
             return gulp.src(SASS_FILES)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            // .pipe(uglifycss())
            .pipe(gulp.dest('./public_html/css/'))
            .on('finish', function ( ) {
                gutil.log("processing change in css");
                   livereload.reload(pageURL);
            });

}
         

gulp.task('sass', function () {
    sassProcess();

});

 


 function Bundle() {

    
    
    var Bundler = browserify({
        entries: './front-end/react/index.js',
        transform: [["babelify", {"presets": ["es2015","react"]}]],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });  
    return Bundler
            .bundle()
            .on('error', notify);
}

gulp.task('react-build', function () {
    Bundle()
            .pipe(source('bundle.js'))
        //    .pipe(gulpif(argv.production, streamify(uglify())))
       //     .pipe(gulpif(argv.production, rename({suffix: '.min'})))
            .pipe(gulp.dest(targetLocation+'/js/'))
            .on('finish', function ( ) {
                gutil.log("build bundle end");
                 livereload.reload(pageURL);
            });
    ;
});



/////////
///////////////////////////////////////////////////////////////////////////////
/**
 * task for reloading for backend, eg route changes
 * takes 3-4 seconds, will also pick up public css and js
 * but is slower for refresh compared to frontend task for css and public js
 */
gulp.task('backend', function () {

    livereload.listen();
    console.log("zzzz "+path.dirname('.gulpfile.js'))
    nodemon(
            {
                script: 'server.js',
                verbose: true,
                ext: 'js ejs',
                watch: ['./app'],
               // ignore: ['./front-end/*','./public_html/js/*'],
                tasks: function (changedFiles)
                {
                    var tasks = [];
                    changedFiles.forEach(function (file)
                    {
                        //gutil.log("file "+ path.dirname(file)+" "+/views/.test(path.dirname(file)) );
                        if (path.extname(file) === '.js' && /react/.test(path.dirname(file))    && !~tasks.indexOf('react'))
                        {
                          //console.log("react js file")
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



 

gulp.task('frontend-watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    watch(REACT_FILES, function (events, done) {

        gulp.start('react-build');
    });

    

 

});

gulp.task('default', ['backend', 'frontend-watch']);

/* end fronend task ---------------------------------------- */



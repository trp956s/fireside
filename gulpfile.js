var gulp = require('gulp');
var gulpif = require('gulp-if');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

// Provide useful Help output
gulp.task('help', function() {
  $.taskListing();

  console.log($.util.colors.gray('Key Tasks'));
  console.log('------------------------------');
  console.log('    serve-dev\tRuns development server');
  console.log('    serve-build\tRuns build server');
  console.log('    build\tCreates new production-ready build');
  console.log();
});
gulp.task('default', ['help']);

// Performs validation of JavaScript
gulp.task('validate', function() {
  log('Analyzing JavaScript source with JSHint and JSCS');

  return gulp
    .src(config.js)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles-less', function() {
  log('Compiling LESS --> CSS');

  return gulp
    .src(config.less)
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('styles-sass', function() {
  log('Compiling SASS --> CSS');

  return gulp
    .src(config.sass)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('styles', ['clean-styles', 'styles-less', 'styles-sass']);

gulp.task('fonts', function() {
  log('Copying fonts');

  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', function() {
  log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('static', function() {
  log('Copying static files');

  return gulp
    .src(config.static)
    .pipe(gulp.dest(config.build));
});

gulp.task('clean', function() {
  var delconfig = [].concat(config.temp, config.build);
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  return del(delconfig);
});

gulp.task('clean-fonts', function() {
  return clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function() {
  return clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', function() {
  return clean(config.temp + '**/*.css');
});

gulp.task('clean-code', function() {
  var files = [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js'
  );
  return clean(files);
});

gulp.task('sass-watcher', function() {
  gulp.watch([config.sass], ['styles-sass']);
});

gulp.task('less-watcher', function() {
  gulp.watch([config.less], ['styles-less']);
});

gulp.task('templatecache', ['clean-code'], function() {
  log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp));
});

// inject bower components
gulp.task('wiredep', function() {
  log('Wiring the bower dependencies into the html');

  var wiredep = require('wiredep').stream;
  var options = config.getWiredepDefaultOptions();

  gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe(inject(config.js, '', config.jsOrder, {
      transform: config.transformInjectJS
    }))
    .pipe(gulp.dest(config.client));
});

// inject custom code
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
  log('Wire up the app css into the html, and call wiredep');

  return gulp
    .src(config.index)
    .pipe(inject(config.css, '', ['**/*.css'], {
      transform: config.transformInjectCSS
    }))
    .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject', 'less-watcher', 'sass-watcher'], function() {
  return serve(true /* isDev */);
});

gulp.task('serve-build', ['build'], function() {
  return serve(false /* isDev */);
});

// build pipeline
gulp.task('build', ['inject', 'fonts', 'images', 'static'], function() {
  log('Optimizing the javascript, css, html');

  var searchPath = [].concat('./', config.client);
  var templateCache = config.temp + config.templateCache.file;
  var filterNotIndex = $.filter(['**/*', '!**/index.html'], { restore: true });

  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe($.inject(gulp.src([templateCache], {read: false}), {
      starttag: '<!-- inject:templates:js -->'
    }))
    .pipe($.useref({searchPath: searchPath}))
    .pipe(gulpif('*.js', $.ngAnnotate()))
    .pipe(gulpif('app.js', $.uglify()))
    .pipe(gulpif('lib.js', $.uglify()))
    .pipe(gulpif('*.css', $.csso()))
    .pipe(filterNotIndex)
    .pipe($.rev())
    .pipe(filterNotIndex.restore)
    .pipe($.revReplace())
    .pipe(gulp.dest(config.build));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function() {
  var msg = 'Bumping versions';
  var type = args.type;
  var version = args.version;
  var options = {};

  if(version) {
    options.version = version;
    msg += ' to ' + version;
  } else {
    options.type = type;
    msg += ' for a ' + type;
  }
  log(msg);

  return gulp
    .src(config.packages)
    .pipe($.print())
    .pipe($.bump(options))
    .pipe(gulp.dest(config.root));
});

//////////////

function clean(path) {
  log('Cleaning: ' + $.util.colors.blue(path));
  return del(path);
}

function log(msg) {
  if(typeof(msg) === 'object') {
    for(var item in msg) {
      if(msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function serve(isDev) {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build'
    },
    watch: [config.server]
  };

  return $.nodemon(nodeOptions)
    .on('restart', function(ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
    })
    .on('start', function() {
      log('*** nodemon started');
    })
    .on('crash', function() {
      log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function() {
      log('*** nodemon exited cleanly');
    });
}

/**
 * Inject files in a sorted sequence at a specified inject label.
 * Unabashedly borrowed from https://github.com/johnpapa/generator-hottowel/pull/36/files
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @param   {Object} cfg   the configuration options for $.inject
 * @returns {Stream}   The stream
 */
function inject(src, label, order, cfg) {
  var options = cfg || {};
  if (label) {
    options.name = 'inject:' + label;
  }

  return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream.
 * Unabashedly borrowed from https://github.com/johnpapa/generator-hottowel/pull/36/files
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
  order = order || ['**/*'];
  return gulp
    .src(src)
    .pipe($.order(order));
}

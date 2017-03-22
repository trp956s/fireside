module.exports = function() {
    var bower = './bower_components/';
    var client = './src/client/';
    var clientApp = client + 'app/';
    var root = './';
    var server = './src/server/';
    var temp = './.tmp/';

    var config = {
        /**
         * File paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './public/',
        client: client,
        css: temp + '*.css',
        fonts: [
            bower + 'bootstrap/dist/fonts/*.*',
            bower + 'font-awesome/fonts/*.*',
        ],
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.js',
            '**/config.js',
            '**/*.module.js',
            '**/*.js'
        ],
        less: client + 'styles/*.less',
        root: root,
        sass: [
            client + 'styles/*.sass',
            client + 'styles/*.scss'
        ],
        server: server,
        static: [
            client + '*.txt',
            client + '*.xml',
            client + '*.json'
        ],
        temp: temp,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: bower,
            exclude: ['/jquery', '/bootstrap/dist/js'],
            ignorePath: '../..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * Node settings
         */
        defaultPort: 8080,
        nodeServer: server + 'server.js'

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            exclude: config.bower.exclude,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    config.transformInjectJS = function(filepath, file, i, length) {
        var prefix = '/src/client/',
            wrap = function(path) {
                return '<script src="' + path + '"></script>';
            };
        if (filepath.startsWith(prefix)) {
            return wrap(filepath.slice(prefix.length));
        }
        return wrap(filepath);
    };

    config.transformInjectCSS = function(filepath, file, i, length) {
        var prefix = '/src/client/',
            wrap = function(path) {
                return '<link rel="stylesheet" href="' + path + '">';
            };
        if (filepath.startsWith(prefix)) {
            return wrap(filepath.slice(prefix.length));
        }
        return wrap(filepath);
    };

    return config;
};

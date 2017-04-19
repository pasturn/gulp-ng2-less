var through2 = require('through2');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');
var less = require('less');
var assign = require('object-assign');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var PluginsError = gutil.PluginError;


const PLUGIN_NAME = 'gulp-ng2-less';

module.exports = function (options) {
    
    var opts = assign({}, {
        compress: false
    }, options)


    var content;
    var base;
    var matches;   
    var styleUrlRegexp = /styleUrls[\'"\s]*:[\s]*\[(.*)\]/;

    function complierLess(paths, cb){
        if(paths.length > 0) {
            var path = path.join(base, paths.shift());
            var content = fs.readFileSync(path, 'utf8');

            less.render(content, function(e, css){
                console.log(css)
            })
        }
    }

    return through2.obj(function(file, enc, cb){
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()){
            throw new PluginError(PLUGIN_NAME, 'gulp-ng2-less steaming not supported')
        }

        content = file.content.toString('utf-8');
        base = options.basePath ? options.basePath : path.dirname(file.path)
        matches = styleUrlRegexp.exec(content);

        //compiler 执行

        if (matches === null){
            return;
        }

        complierLess(matches)

    })
}
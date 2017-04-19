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

    const COMPILER_SUCCESS = "COMPILER_SUCCESS";
    const COMPILER_ERROR = "COMPILER_ERROR";
    const CODE_EXIT = "CODE_EXIT";


    return through2.obj(function(file, enc, cb){
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()){
            throw new PluginError(PLUGIN_NAME, 'gulp-ng2-less steaming not supported')
        }

        content = file.contents.toString('utf-8');
        base = opts.basePath ? opts.basePath : file.path
    
        matches = styleUrlRegexp.exec(content);
        
        var lessPaths = matches[1].replace(/[\ '"]/g,"").split(',')

        if (matches === null){
            compilerCallback(CODE_EXIT)
            return;
        }
        //compiler 执行
        compilerLess(lessPaths, compilerCallback)

        cb(null, file)


        function compilerLess(lessPaths, callback){
            var css = "";
            if(lessPaths.length > 0) {
                for(var i=0; i<lessPaths.length; i++){
                    var lessPath = path.join(base, lessPaths[i]);
                    console.log(lessPath)
                    var content = fs.readFileSync(lessPath, 'utf8');

                    less.render(content, function(err, result){
                        if(err) {
                            callback(COMPILER_ERROR, 'Error while compiling less template' + lessPath +  '". Error from "less" plugin: ' + err)
                        }
                        css += result.css
                    })
                }
                callback(COMPILER_SUCCESS, css.toString().replace(/\\([\s\S])|(`)/g,"\\$1$2"), lessPaths)
                console.log(css)
            }
        }

        function compilerCallback(code, str, lessPaths){
            if(code === COMPILER_SUCCESS){
                // compilerLess(lessPaths, compilerCallback)
            } else if(code === COMPILER_ERROR){

            } else if(code === CODE_EXIT){
                cb(null, file);
            }

        }

    })
}
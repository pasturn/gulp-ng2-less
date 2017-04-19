/* global describe, it */

'use strict';
var assert = require('assert');
var es = require('event-stream');
var fs = require('fs')
var File = require('vinyl');
var ng2Less = require('../index');

describe('gulp-ng2-less', function(){
    describe('in buffer mode', function(){
        it('shuold print css', function(done) {
            var stream = ng2Less();
            // var fakeBuffer = fs.readFileSync('./testing/template/app.component.js')
            // console.log(fakeBuffer)
            var fakeFile = new File({
                contents: new Buffer('abufferwiththiscontent')
            })
            console.log(fakeFile)

            stream.once('end', function(){
                done()
            })
            stream.write(fakeFile);

            stream.end()
    
           
        })
    })
})
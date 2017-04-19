var assert = require('assert');
var es = require('event-stream');
var fs = require('fs');
var ng2Less = require('../index');

describe('gulp-ng2-less', function(){
    describe('in buffer mode', function(){
        it('shuold print css', function(done) {
            var contents = fs.readFileSync('./testing/template/app.component.js', 'utf8');
            var testNg2Less = ng2Less()
            testNg2Less.write(contents);

            testNg2Less.once('data', function(file) {
                assert(file.isButter());
                
                done()
            })
        })
    })
})
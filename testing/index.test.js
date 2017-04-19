var assert = require('assert');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var ng2Less = require('../');

describe('gulp-ng2-less', function() {
  describe('in buffer mode', function() {

    it('shuld render less', function(done) {

      var tplPath = __dirname + '/template/app.component.js'
      var template = fs.readFileSync(tplPath)

      var fakeFile = new File({
        contents: template,
        path: path.dirname(tplPath)
      });

      var myNg2Less = ng2Less();

      myNg2Less.write(fakeFile);

      myNg2Less.once('data', function(file) {
        assert(file.isBuffer());

        assert.equal(file.contents.toString('utf8'), fakeFile.contents);
        done();
      });

    });

  });
});
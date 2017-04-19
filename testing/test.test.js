var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var prefixer = require('../');

describe('gulp-prefixer', function() {
  describe('in buffer mode', function() {

    it('should prepend text', function(done) {

      // 创建伪文件
      var fakeFile = new File({
        contents: new Buffer('abufferwiththiscontent')
      });

      // 创建一个 prefixer 流（stream）
      var myPrefixer = prefixer('prependthis');

      // 将伪文件写入
      myPrefixer.write(fakeFile);

      // 等文件重新出来
      myPrefixer.once('data', function(file) {
        // 确保它以相同的方式出来
        assert(file.isBuffer());

        // 检查内容
        assert.equal(file.contents.toString('utf8'), 'abufferwiththiscontent');
        done();
      });

    });

  });
});
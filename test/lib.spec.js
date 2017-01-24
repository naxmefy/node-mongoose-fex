var mongoose = require('mongoose')
var bluebird = require('bluebird')

var plugin = require('..')

mongoose.Promise = bluebird
mongoose.plugin(plugin)

var schema = new mongoose.Schema({
  test: {type: String, unique: true, required: true}
})

before(function (done) {
  this.model = mongoose.model('LibTestSchema', schema)
  this.connection = mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/test',
    {},
    done
  )
})

after(function (done) {
  delete mongoose.connection.models['LibTestSchema']
  mongoose.connection.close(done)
})

describe('library', function () {
  it('should be a function (mongoose plugin)', function () {
    plugin.should.be.a.Function()
  })
})

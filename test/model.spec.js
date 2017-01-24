describe('model', function () {
  it('should have a static method findBy', function () {
    this.model.findBy.should.be.a.Function()
  })

  it('should have a static method findOneBy', function () {
    this.model.findOneBy.should.be.a.Function()
  })

  it('should have a static method findByTest', function () {
    this.model.findByTest.should.be.a.Function()
  })

  it('should have a static method findOneByTest', function () {
    this.model.findOneByTest.should.be.a.Function()
  })

  describe('statics', function () {
    before(function (done) {
      this.model.create({test: 'test'}, done)
    })

    after(function (done) {
      this.model.remove(done)
    })

    describe('findBy', function () {
      it('should return an array of documents', function (done) {
        this.model.findBy('test', 'test', function (err, documents) {
          if (err) return done(err)
          documents.should.be.an.Array()
          done()
        })
      })
    })

    describe('findOneBy', function () {
      it('should return a documents', function (done) {
        this.model.findOneBy('test', 'test', function (err, document) {
          if (err) return done(err)
          document.should.be.an.Object()
          document.test.should.be.eql('test')
          done()
        })
      })
    })
  })
})

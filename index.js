var async = require('async')
var omit = require('lodash.omit')
var forEach = require('lodash.foreach')
var capitalize = require('lodash.capitalize')
var camelCase = require('lodash.camelcase')

module.exports = function (schema) {

  /**
   * Mongoose model method to find documents by given parameters
   * @param {String} by Property keyword to search by
   * @param {*} search Search parameter to search with
   * @param {Function} callback Optional callback
   * @return {*} returns a mongoose query (promise)
   */
  schema.statics.findBy = function (by, search, callback) {
    return this.find({[by]: search}, callback)
  }

  /**
   * Mongoose model method to find one document by given parameters
   * @param {String} by Property keyword to search by
   * @param {*} search Search parameter to search with
   * @param {Function} callback Optional callback
   * @return {*} returns a mongoose query (promise)
   */
  schema.statics.findOneBy = function (by, search, callback) {
    return this.findOne({[by]: search}, callback)
  }

  /**
   * we create a find by and findOne by handler for each path property
   * except _id, id
   */
  forEach(omit(schema.paths, ['_id', 'id']), function (value, key) {
    var byKey = capitalize(camelCase(key))
    schema.statics[`findBy${byKey}`] = function (search, callback) {
      return this.findBy(key, search, callback)
    }

    schema.statics[`findOneBy${byKey}`] = function (search, callback) {
      return this.findOneBy(key, search, callback)
    }
  })

  schema.statics.findOneOrCreate = function (search, item, callback) {
    return this.findOne(search)
      .then(function (doc) {
        if (doc) {
          if (callback) callback(null, doc)
          return doc
        }

        doc = new this(item)
        return doc.save(callback)
      })
      .catch(function (err) {
        if (callback) callback(err)
        return err
      })
  }

  schema.statics.findByOrCreate = function (by, items, callback) {
    var model = this
    return new model.base.Promise(function (respond, reject) {
      async.eachSeries(items, function (item, next) {
        return model.findOneByOrCreate(by, item, next)
      }, function (err, results) {
        if (err) {
          if (callback) callback(err)
          return reject(err)
        }

        if (callback) callback(null, results)
        return respond(results)
      })
    })
  }

  schema.statics.findOneByOrCreate = function (by, item, callback) {
    return this.findOneByOrCreate({[by]: item[by]}, callback)
  }
}

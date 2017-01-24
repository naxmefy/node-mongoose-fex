var async = require('async')
var isArray = require('lodash.isarray')
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

  schema.statics.findOrCreate = function (search, items, cb) {
    var model = this
    return new model.base.Promise(function (respond, reject) {
      async.eachSeries(items, function (item, next) {
        return model.findOneOrCreate(search, item, next)
      }, function (err, results) {
        if (err) return reject(err)
        return respond(results)
      })
    })
  }

  schema.statics.findOneOrCreate = function (search, data, cb) {
    return this.findOne(search)
      .then(function (doc) {
        if (doc) {
          if (cb) cb(null, doc)
          return doc
        }

        doc = new this(data)
        return doc.save(cb)
      })
      .catch(function (err) {
        if (cb) cb(err)
        return err
      })
  }
}

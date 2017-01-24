# node-mongoose-fex
added several methods the mongoose schema to find, update or create documents. fex = find extensions

[![npm (scoped)](https://img.shields.io/npm/v/@naxmefy/mongoose-fex.svg)](https://www.npmjs.com/package/@naxmefy/mongoose-fex)
![node version](https://img.shields.io/badge/node-%3E%3D4.x-blue.svg)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/naxmefy/node-mongoose-fex/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/naxmefy/node-mongoose-fex.svg?branch=master)](https://travis-ci.org/naxmefy/node-mongoose-fex)
[![Dependency Status](https://gemnasium.com/badges/github.com/naxmefy/node-mongoose-fex.svg)](https://gemnasium.com/github.com/naxmefy/node-mongoose-fex)


[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7124f67decbb4370bbc53f07f234c3be)](https://www.codacy.com/app/naxmefy/node-mongoose-fex)
[![Codacy Badge](https://api.codacy.com/project/badge/coverage/7124f67decbb4370bbc53f07f234c3be)](https://www.codacy.com/app/naxmefy/node-mongoose-fex)

## Prerequisites

you have to define a [promise library](http://mongoosejs.com/docs/promises.html)
in your mongoose installation, like:

* [bluebird](https://www.npmjs.com/package/bluebird)
* [mpromise](https://www.npmjs.com/package/mpromise)
* [q.Promise](https://www.npmjs.com/package/q)
* [ES6 Native Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

```JavaScript
const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise
```

## Installation

```
$ npm install --save @naxmefy/mongoose-fex
```

## Usage

**Global**
```JavaScript
const mongoose = require('mongoose')
const mongooseFex = require('@naxmefy/mongoose-fex')

mongoose.plugin(mongooseFex)
```

**Per Schema**
```JavaScript
const mongoose = require('mongoose')
const mongooseFex = require('@naxmefy/mongoose-fex')

const schema = new mongoose.Schema({})
schema.plugin(mongooseFex)
```

## API

**findBy (String, Any [, Function])**
```JavaScript
model.findBy('test', testValue, function (err, documents) {})
```
> Hint: The plugin also creates findBy shortcuts per defined path
>
> **findBy{Key} (Any [, Function])**
> ```JavaScript
> const schema = new mongoose.Schema({
>   test: String
> })
> schema.plugin(mongooseFex)
> const model = mongoose.model('TestSchema', schema)
> model.findByTest(testString, function (err, documents) {
>   if (err) return console.error(err)
>   console.log(documents)
> })
> ```

**findOneBy (String, Any [, Function])**
```JavaScript
model.findOneBy('test', testValue, function (err, document) {})))
```
> Hint: The plugin also creates findOneBy shortcuts per defined path
>
> **findOneBy{Key} (Any [, Function])**
> ```JavaScript
> const schema = new mongoose.Schema({
>   test: String
> })
> schema.plugin(mongooseFex)
> const model = mongoose.model('TestSchema', schema)
> model.findOneByTest(testString, function (err, document) {
>   if (err) return console.error(err)
>   console.log(document)
> })
> ```

**findOneOrCreate (Object, Object [, Function])**
```JavaScript
model.findOneOrCreate({test: 'test'}, {test: 'test'}, function (err, document) {})))
```

**findByOrCreate (String, Array<Object> [, Function])**
```JavaScript
model.findByOrCreate('test', [{test: 'test1'}, {test: 'test2'}], function (err, documents) {})))
```

**findOneByOrCreate (String, Object [, Function])**
```JavaScript
model.findOneByOrCreate('test', {test: 'test'}, function (err, document) {})))
```

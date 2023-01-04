var express = require('express')
var router = express.Router()
var url = require('url');
var make = require('./make');
var path = require('path');
var fs = require('fs');
const port = 3000; // could be imported from another file instead

// Get a list of all the files in the data directory

var files = fs.readdirSync(path.join(__dirname, "data")).filter(fn => fn.endsWith('.geojson'));
for (i = 0; i < files.length; i++)
  files[i] = files[i].replace(/\.[^/.]+$/, "");
console.log(files)

// Landing page

router.get('/', function (req, res) {
  var urlParts = url.parse(req.url, true);
  res.json(make.landingPage(urlParts.query.f))
})

// // Collections 

// router.get('/collections', function(req, res) {
//   res.send('Collections in this service')
// })

// Collections

router.get('/collections', function (req, res) {
  // var urlParts = url.parse(req.url, true);
  res.json(make.collections(files));
})

// Collection by ID

router.get('/collections/:collectionId', function(req, res) {
  console.log(req.params);
  res.send('Collection by ID')
})

// Collection items

router.get('/collections/:collectionId/items', function(req, res) {
    res.send('Collection items')
})

// Collection queryables

router.get('/collections/:collectionId/queryables', function(req, res) {
  res.send('Collection queryables')
})

// Collection items by ID

router.get('/collections/:collectionId/items/:item', function(req, res) {
  console.log(req.params);
  res.send('Collection item by ID')
})

// Open API

router.get('/openapi', function(req, res) {
  res.send('API definition')
})

// Conformance declaration

router.get('/conformance', function(req, res) {

  var conformance = {};
  conformance.conformsTo = [];
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/html");
  conformance.conformsTo.push("http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson");
  res.json(conformance)

})

module.exports = router
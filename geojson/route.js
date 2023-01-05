var express = require('express')
var router = express.Router()
var url = require('url');
var make = require('./make');
var path = require('path');
var fs = require('fs');
const port = 3000; // could be imported from another file instead

// List the files in the data directory

var fileNames = fs.readdirSync(path.join(__dirname, "data")).filter(fn => fn.endsWith('.geojson'));

var dataDict = {};
fileNames.forEach(fileName => {
  var rawData = fs.readFileSync(path.join(__dirname, "data", fileName));
  var geojson = JSON.parse(rawData);

  var fn = fileName.replace(/\.[^/.]+$/, "");

  dataDict[fn] = geojson;
});

// Landing page

router.get('/', function (req, res) {
  var urlParts = url.parse(req.url, true);
  res.json(make.landingPage(urlParts.query.f))
})

// Collections

router.get('/collections', function (req, res) {
  res.json(make.collections(dataDict));
})

// Collection

router.get('/collections/:collectionId', function (req, res) {

  if (null == dataDict[req.params.collectionId])
  {
    // If the parameter collectionId does not exist on the server, the status code of the response will be 404
    res.status(404).send("The requested URL " + req.url + " was not found on this server");
    return;
  }

  var urlParts = url.parse(req.url, true);
  res.json(make.collection(req.params.collectionId));
})

// Collection items

router.get('/collections/:collectionId/items', function (req, res) {
    res.json(make.items(req.params.collectionId, dataDict[req.params.collectionId]));
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
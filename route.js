var express = require('express')
var router = express.Router()
var make = require('./landingPage');
const port = 3000; // could be imported from another file instead

// Landing page

router.get('/', function(req, res) {

  var landingPage = make.header("OGC API Features",                "Implementation of the OGC API Features suite of standards with Node and Express");
  landingPage.links.push(make.item(`http://localhost:${port}/`,            "self",         "application/json", "This document as JSON"));
  landingPage.links.push(make.item(`http://localhost:${port}/openapi`,     "service-desc", "application/vnd.oai.openapi+json;version=3.0", "The OpenAPI definition as JSON"));
  landingPage.links.push(make.item(`http://localhost:${port}/conformance`, "conformance",  "application/json", "OGC API conformance classes implemented by this server"));
  landingPage.links.push(make.item(`http://localhost:${port}/collections`, "data",         "application/json", "Information about the feature collections"));

  res.json(landingPage)

})

// Collections 

router.get('/collections', function(req, res) {
  res.send('Collections in this service')
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
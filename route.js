var express = require('express')
var router = express.Router()

// Landing page

router.get('/', function(req, res) {
    res.send('Landing page')
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
    res.send('Conformance declaration')
})

module.exports = router
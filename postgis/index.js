const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Route for the `GET` request on the root `/` URL

app.get('/', (request, response) => {
  response.send('This is Node.js, Express, and Postgres API compliant with the OGC specifications')
})

// // Route for the `GET` request on the  `/collections/collectionID/queryables` URL

// app.get('/collections/images/queryables', (request, response, next) => {
//   var options = {
//     root: path.join(__dirname)
// };

// var fileName = 'queryables.json';
// response.sendFile(fileName, options, function (err) {
//     if (err) {
//         next(err);
//     } else {
//         console.log('Sent:', fileName);
//         next();
//     }
// });
// })

// SET the HTTP request method, the endpoint URL path, and the relevant function for each endpoint:

app.get('/collections/images', db.getImages)
app.get('/collections/images/queryables', db.getImagesqueryables)
app.get('/collections/images/:id', db.getImageById)

// Set the port

app.listen(port, () => {
  console.log(`OGC API Features service listening on port ${port}.`)
})

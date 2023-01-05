// Configuration of the PostreSQL connection (stored in a separate file)

require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// GET all images

const getImages = (req, res) => {
  pool.query('SELECT * FROM images ORDER BY id ASC LIMIT 50', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// GET all queryables

const getImagesqueryables = (req, res) => {
  pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='images';", (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// GET a single image by ID

const getImageById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM images WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

// Exporting CRUD functions in a REST API

module.exports = {
  getImages,
  getImagesqueryables,
  getImageById,
}

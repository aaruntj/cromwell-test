const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const userRoutes = require('./routes/user')

app.use(cors())
app.use(express.json())

app.use("/user", userRoutes)

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB
})



// TEST
app.get("/", (req, res) => {
  res.send("test hello from home")
})

app.listen(PORT || 8080, () => {
  console.log(`Express server is up and running on port ${PORT ? PORT : 8080}`)
})
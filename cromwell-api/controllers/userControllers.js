const dotenv = require("dotenv")
dotenv.config()
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB
})

async function userRegister(req, res) {
  console.log("user register")

  const { name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  // Check if email already exists
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length > 0) {
      return res.status(400).send({ "message": "User already exists" })
    }
  } catch(error) {
    console.log(error)
    res.status(500)
  }
  
  
  // Store email, name and hashedPassword in database
  try {
    await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword])
    res.status(200).send({ "message": "User registered" })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}


async function userLogin(req, res) {
  console.log("user login")
  const { email, password } = req.body;
  // Retrieve user from database
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) {
      return res.status(401).send({ "message": "Invalid email" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const token = jwt.sign({ email: user.email }, `Secret:${process.env.TOKENKEY}`)
      res.status(200).json({ token })
    } else {
      res.status(401).send({ "message": "Invalid Credentials" })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}


async function fetchUserDetails(req, res) {
  const {email, token} = req.headers
  if ((!email) || (!token)) {
    res.status(404).send("email or token missing")
  }
  console.log("fetch user details")
  try {
    const data = await pool.query('select name, id from users where email = $1',[email])
    if(data.rows.length==0) {
      res.status(404).send("user not found")
    }
    res
      .status(200)
      .send(data.rows)

    console.log(data)
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  userRegister,
  userLogin,
  fetchUserDetails,
}
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

router
  .route("/register")
  .post(userController.userRegister)

router
  .route("/login")
  .post(userController.userLogin)

router
  .route("/")
  .get(userController.fetchUserDetails)

module.exports = router
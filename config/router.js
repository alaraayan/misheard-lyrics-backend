
import express from 'express'
import auth from '../controllers/users.js'

const router = express.Router()

// ! User routes
// * Register 
router.route('/register')
  .post(auth.register)

// * Login
router.route('/login')
  .post(auth.login)
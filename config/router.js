
import express from 'express'
import auth from '../controllers/auth.js'
import artists from '../controllers/artists.js'

const router = express.Router()

// ! USER ROUTES
// * Register 
router.route('/register')
  .post(auth.register)

// * Login
router.route('/login')
  .post(auth.login)


// ! ARTIST ROUTES
//* List routes
router.route('/artists')
  .get(artists.index)
export default router
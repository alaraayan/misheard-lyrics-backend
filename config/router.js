
import express from 'express'
import auth from '../controllers/auth.js'
import artists from '../controllers/artists.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// ! USER ROUTES
// * Register 
router.route('/register')
  .post(auth.register)

// * Login
router.route('/login')
  .post(auth.login)

//* User Profile
router.route('/profile')
  .get(secureRoute, auth.userProfile)

// ! ARTIST ROUTES
//* List routes
router.route('/artists')
  .get(artists.index)
  .post(secureRoute, artists.create)

//* Detail routes
router.route('/artists/:artistId')
  .get(artists.show)
  .delete(secureRoute, artists.remove)
  .put(secureRoute, artists.edit)

router.route('/artists/:artistId/like')
  .post(secureRoute, artists.like)

export default router
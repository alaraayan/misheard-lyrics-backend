import jwt from 'jsonwebtoken'

import { secret } from '../config/environment.js'
import User from '../models/user.js'
import { Unauthorized } from './errors.js'

async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      throw new Unauthorized()
    }

    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, secret)

    const user = await User.findById(payload.userId)
    console.log(user)
    if (!user) {
      throw new Unauthorized()
    }

    req.currentUser = user
    req.currentUserId = user._id
  
    next()
  } catch (err) {
    next(err)
  }
}

export default secureRoute

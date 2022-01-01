import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { UsernameExists, EmailExists, PasswordsNotMatching, UserInfoMissing, NotFound, Unauthorized } from '../lib/errors.js'

async function register(req, res, next) {
  try {
    const existingUsername = await User.findOne({ username: req.body.username })
    if (existingUsername){
      throw new UsernameExists
    }
    const existingEmail = await User.findOne({ email: req.body.email })
    if (existingEmail){
      throw new EmailExists
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      throw new PasswordsNotMatching
    }
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.passwordConfirmation) {
      throw new UserInfoMissing
    }
    const user = await User.create(req.body)

    res.status(201).json(user)
    console.log(user)

  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin) {
      throw new NotFound
    }
    const isValidPassword = userToLogin.validatePassword(req.body.password)
    if (!isValidPassword) {
      throw new Unauthorized
    }
    const isAdmin = userToLogin.isAdmin
    const token = jwt.sign(
      { userId: userToLogin._id },
      secret,
      { expiresIn: '12h' }
    )
    res.status(202).json({ message: `Welcome Back ${userToLogin.username}`, token, isAdmin })

  } catch (err) {
    next(err)
  }
}

async function userProfile(req, res) {
  const { currentUserId } = req
  const user = await User.findById(currentUserId)
    .populate('favoriteArtists')
  return res.status(200).json(user)
}

export default {
  register,
  login,
  userProfile,
}
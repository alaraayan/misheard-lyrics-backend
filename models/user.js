import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: false, isAdmin: false, username: false } }))
userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)
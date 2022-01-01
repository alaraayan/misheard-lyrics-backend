import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

userSchema
  .virtual('favoriteArtists', {
    ref: 'Artist',
    localField: '_id',
    foreignField: 'likedBy',
  })
  .get(function(likedArtists) {
    if (!likedArtists) return

    return likedArtists.map(artist => {
      return {
        _id: artist.id,
        name: artist.name,
        images: artist.images,
        genres: artist.genres,
        spotifyId: artist.spotifyId,
      }
    })
  })

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export default User
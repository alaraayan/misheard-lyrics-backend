import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const imagesSchema = new mongoose.Schema({
  heightAndWidth: { type: Number, required: true },
  imgUrl: { type: String, required: true },
})

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  spotifyId: { type: String, required: true, unique: true },
  spotifyLink: { type: String, required: true },  
  spotifyFollowers: { type: Number, required: true },
  genres: { type: [String], required: true },
  images: { type: [imagesSchema], required: true },
  bio: { type: String, required: true },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
})

artistSchema.plugin(mongooseUniqueValidator)

artistSchema.set('toJSON', { virtuals: true })

const Artist = mongoose.model('Artist', artistSchema)

export default Artist
import mongoose from 'mongoose'

function validateLyricComponents(text) {
  return text && text.length > 2
}

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const lyricSchema = new mongoose.Schema({
  artist: { type: [String], required: true },
  song: { 
    type: String, 
    required: true,
    validate: [
      { validator: validateLyricComponents, msg: 'Name of the song is required' }
    ],
  },
  album: { type: String, required: true },
  misheardLyric: { 
    type: String, 
    required: true,
    validate: [
      { validator: validateLyricComponents, msg: 'Misheard lyric is required' }
    ],
  },
  realLyric: { 
    type: String, 
    required: true,
    validate: [
      { validator: validateLyricComponents, msg: 'Real lyric is required' }
    ],
  },
  story: { type: String, required: false },
  songLink: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
})

export default mongoose.model('Lyric', lyricSchema)
import Artist from '../models/artist.js'
// import { NotFound, Unauthorized, AlreadyExists } from '../lib/errors.js'

//* GET ALL ARTISTS

async function artistIndex(_req, res, next) {
  try {
    const artists = await Artist.find()
    return res.status(200).json(artists)
  } catch (err) {
    next(err)
  }
}

export default {
  index: artistIndex,
}
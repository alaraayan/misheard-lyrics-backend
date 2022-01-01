import { AlreadyExists, NotFound, Unauthorized } from '../lib/errors.js'
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

//* ADD AN ARTIST

async function addArtist(req, res, next) {
  const { currentUserId, currentUser } = req
  console.log(req.currentUser)
  if (!currentUser) {
    throw new Unauthorized
  }
  try {
    const existingArtist = await Artist.findOne({ spotifyId: req.body.id })

    if (existingArtist) {
      throw new AlreadyExists
    }

    const newArtist = await Artist.create({ ...req.body, addedBy: currentUser })
    if (!newArtist.addedBy.equals(currentUserId) && !currentUser.isAdmin){
      throw new Unauthorized()
    }
    console.log(newArtist)

    return res.status(201).json(newArtist)
  } catch (err) {
    next(err)
  }
}

//* SHOW A SINGLE ARTIST

async function getAnArtist(req, res, next) {
  const { artistId } = req.params
  try {
    const artistToShow = await Artist.findById(artistId)
      .populate('addedBy')
    
    if (!artistToShow) {
      throw new NotFound
    }
    return res.status(200).json(artistToShow)
  } catch (err) {
    next(err)
  }
}
//* DELETE AN ARTIST
//* DELETE AN ARTIST

export default {
  index: artistIndex,
  create: addArtist,
  show: getAnArtist,
}
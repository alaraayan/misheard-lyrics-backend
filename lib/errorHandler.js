export default function errorHandler(err, req, res, next) {
  console.log('🔥There was an error🔥')
  console.log(err.name)
  console.log(err)

  // ? Specific error handling, for certain kinds of errors.
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }
  // ? Not found errors..
  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not found' })
  }

  if (err.name === 'AlreadyExists') {
    return res.status(400).json({ message: 'This already exists in the database' })
  }

  // ? VALIDATION ERRORS
  if (err.name === 'NotValid' || err.name === 'NotOwner') {
    return res.status(400).json({ message: 'There was a problem.' })
  }
  

  if (err.name === 'ValidationError') {
    console.log(err.name)
    const errors = {}
  
    for (const key in err.errors) {
      errors[key] = err.errors[key].message
    }
  
    return res.status(422).json({
      message: 'Form Validation Error',
      errors,
    })
  }

  if (
    err.name === 'Unauthorized' ||
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }


  // ? USER ERRORS
  if (err.name === 'UsernameExists') {
    return res.status(400).json({ message: 'This username is taken, try another' })
  }
  if (err.name === 'EmailExists') {
    return res.status(400).json({ message: 'This email is taken, try another' })
  }
  if (err.name === 'PasswordsNotMatching') {
    return res.status(400).json({ message: 'Make sure your passwords are matching' })
  }
  if (err.name === 'UserInfoMissing') {
    return res.status(422).json({ message: 'Looks like you missed a field...' })
  }
  
  res.sendStatus(500)
  // ? Call the next function
  next(err)
}
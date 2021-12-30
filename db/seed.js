import User from '../models/user.js'
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'


async function seedDatabase() {
  try {
    await connectToDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Database Dropped')

    await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      avatar: 'some-image.jpg',
      isAdmin: true,
    })

    console.log('🤖 Admin user created')

  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }

  await disconnectDb()
  console.log('🤖 Goodbye')
}

seedDatabase()
const {green, red} = require('chalk')

const {db} = require('../server/db')
// const User = require("./server/db/models/user");
const Chair = require('../server/db/models/chair')

const testChairs = [
  {
    name: 'Red Chair',
    price: 99
  },
  {
    name: 'Yellow Chair',
    price: 77
  },
  {
    name: 'Blue Chair',
    price: 55
  },
  {
    name: 'Green Chair',
    price: 33
  },
  {
    name: 'Purple Chair',
    price: 11
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      testChairs.map(chair => {
        return Chair.create(chair)
      })
    )

    // seed your database here!
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}

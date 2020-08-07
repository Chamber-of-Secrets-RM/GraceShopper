const {green, red} = require('chalk')

const {db} = require('../server/db')
// const User = require("./server/db/models/user");
const Chair = require('../server/db/models/chair')
const User = require('../server/db/models/user')
const Order = require('../server/db/models/order')
const OrdersChairs = require('../server/db/models/ordersChairs')

const CSS_COLOR_NAMES = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen'
]
const testUser = [
  {
    email: 'pesekm@dupage.edu',
    isAdmin: false,
    password: 'secret'
  },
  {
    email: 'admin@admin.com',
    isAdmin: true,
    password: 'superSecret'
  }
]
const testOrder = [
  {
    isFulfilled: 0,
    userId: 1
  }
]
const testOrdersChairs = [
  {
    quantity: 5,
    orderId: 1,
    chairId: 1,
    itemTotal: 1485
  },
  {
    quantity: 1,
    orderId: 1,
    chairId: 2,
    itemTotal: 981
  }
]

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
const Chairs = []
for (let i of CSS_COLOR_NAMES) {
  let newObj = {}
  newObj.name = i
  newObj.price = Math.floor(Math.random() * 100000)
  Chairs.push(newObj)
}

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      Chairs.map(chair => {
        return Chair.create(chair)
      })
    )
    await Promise.all(
      testUser.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      testOrder.map(order => {
        return Order.create(order)
      })
    )
    await Promise.all(
      testOrdersChairs.map(ordersChairs => {
        return OrdersChairs.create(ordersChairs)
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

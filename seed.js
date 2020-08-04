const {green, red} = require('chalk')

const User = require('./server/db/models/user')
const Chair = require('./server/db/models/chair')

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
  newObj.price = Math.floor(Math.random() * 1000)
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

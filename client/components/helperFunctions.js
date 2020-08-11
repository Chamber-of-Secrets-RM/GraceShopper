export const binarySearch = (productArr, chairId) => {
  let l = 0
  let r = productArr.length - 1
  let idx = -1
  while (l < r) {
    let m = Math.floor((l + r) / 2)

    if (productArr[m].id == chairId) {
      return m
    } else if (productArr[m].id < chairId) {
      l = m + 1
    } else {
      r = m
    }
  }
  return idx
}

export const convertTime = sequelizeDate => {
  let stringDate = ''

  stringDate = sequelizeDate.slice(0, 10)

  let suffix = ' 00:00:00'

  stringDate += suffix

  return stringDate
}

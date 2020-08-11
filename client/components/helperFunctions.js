export const binarySearch = (productArr, chairId) => {
  productArr = productArr.sort(function(a, b) {
    if (a.id > b.id) return 1
    else if (a.id < b.id) return -1
    else return 0
  })

  console.log('ARRAY AFTER SORT', productArr)

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

  let strArr = stringDate.split('-')

  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  let month = ''
  if (strArr[1] == '01') {
    month = 'Jan'
  } else if (strArr[1] == '02') {
    month = 'Feb'
  } else if (strArr[1] == '03') {
    month = 'Mar'
  } else if (strArr[1] == '04') {
    month = 'Apr'
  } else if (strArr[1] == '05') {
    month = 'May'
  } else if (strArr[1] == '06') {
    month = 'Jun'
  } else if (strArr[1] == '07') {
    month = 'Jul'
  } else if (strArr[1] == '08') {
    month = 'Aug'
  } else if (strArr[1] == '09') {
    month = 'Sep'
  } else if (strArr[1] == '10') {
    month = 'Oct'
  } else if (strArr[1] == '11') {
    month = 'Nov'
  } else if (strArr[1] == '12') {
    month = 'Dec'
  }
  let day = parseInt(strArr[2]).toString()
  let year = strArr[0].toString().slice(2, 4)
  stringDate = day + '-' + month + '-' + year

  return stringDate
}

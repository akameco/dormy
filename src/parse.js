import Cheerio from 'cheerio'

export default function parse(buffer) {
  let $ = Cheerio.load(buffer)
  let menuList = {}
  let getDate = (d) => {
    let y = new Date().getFullYear()
    let m = $('h1').text().match(/\d{1,2}/)[0]
    return [y, m, d].join('-')
  }

  $('.result_main tr').slice(2).each((i, tr) => {
    let menu = []

    $(tr).children().slice(2, 5).each((i, el) => {
      menu.push($(el).text().split('★').filter(x => x !== ''))
    })

    let d = $(tr).children().first().text()

    menuList[getDate(d)] = {
      breakfirst: [menu[0], menu[1]],
      dinner: menu[2]
    }
  })
  return menuList
}


import Cheerio from 'cheerio'

export class Parse {
  constructor(buffer) {
    this.$ = Cheerio.load(buffer)
    this.menus = this.parse()
  }

  parse() {
    let menuList = []
    let getDate = (d) => {
      let y = new Date().getFullYear()
      let m = this.$('h1').text().match(/\d{1,2}/)[0]
      return [y, m, d].join('-')
    }

    this.$('.result_main tr').slice(2).each((i, tr) => {
      let menu = []

      this.$(tr).children().slice(2, 5).each((i, el) => {
        menu.push(this.$(el).text().split('★').filter(x => x !== ''))
      })

      let d = this.$(tr).children().first().text()
      let obj = {
        date: getDate(d),
        breakfirst: [menu[0], menu[1]],
        dinner: menu[2]
      }

      menuList.push(obj)
    })
    return menuList
  }
}


import fs from 'fs'
import {Iconv} from 'iconv'
import {Parse} from './parse.js'
import request from 'request'
import promise from 'bluebird'

// let ryouTypes = ['a1', 'a2', 'b1', 'b2', 'hai']

function getHTML() {
  let params = {
    url:'http://www.dnet.gr.jp/menulist/search/index.php',
    form: {area: 'kanto', stuki: 'this_month', ryou: 'a1'},
    encoding: null
  }

  return new promise((resolve, reject) => {
    request.post(params, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

getHTML().then((body) => {
  let iconv = new Iconv('sjis', 'utf-8')
  let buffer = iconv.convert(body)
  let menus = new Parse(buffer).menus

  let x = menus.filter((x) => x.date === '2015-9-2')
  console.log(JSON.stringify(x, null, 2));
})

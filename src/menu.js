import Promise from 'bluebird'
import request from 'request'
import {toUTF8} from './util'
import {Parse} from './parse.js'

function promisePostRequest(params) {
  return new Promise((resolve, reject) => {
    request.post(params, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(toUTF8(body))
      } else {
        reject(body)
      }
    })
  })
}

export function getMenu(date) {
  let params = {
    url:'http://www.dnet.gr.jp/menulist/search/index.php',
    form: {area: 'kanto', stuki: 'this_month', ryou: 'a1'},
    encoding: null
  }

  return promisePostRequest(params).then((body) => {
    let menus = new Parse(body).menus
    return  menus.filter((x) => x.date === date)[0]
  })
}


import Promise from 'bluebird'
import request from 'request'
import _ from 'lodash'
import {toUTF8} from './util'
import parse from './parse'

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

export function getMenusList() {
  let ryous = ['a1', 'a2', 'b1', 'b2', 'hai']
  return Promise.all(ryous.map(getMenus))
    .then(list => {
      let data = {}
      _.zip(ryous, list).forEach(r => {
        data[r[0]] = r[1]
      })
      return data
    })
}

export function getMenus(ryou) {
  let params = {
    url: 'http://www.dnet.gr.jp/menulist/search/index.php',
    form: {area: 'kanto', stuki: 'this_month', ryou: ryou},
    encoding: null
  }

  return promisePostRequest(params).then((body) => {
    return parse(body)
  })
}


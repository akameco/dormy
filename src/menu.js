import Promise from 'bluebird'
import _ from 'lodash'
import {post} from './util'
import parse from './parse'

export function getMenus(ryou) {
  let params = {
    url: 'http://www.dnet.gr.jp/menulist/search/index.php',
    form: {area: 'kanto', stuki: 'this_month', ryou: ryou},
    encoding: null
  }
  return post(params).then((body) => {
    return parse(body)
  })
}

export default function getMenusList() {
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


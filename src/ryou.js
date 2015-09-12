import Promise from 'bluebird'
import {get} from './util'

function getAreaHTML(area) {
  let params = {
    url: `http://www.dnet.gr.jp/menulist/search/${area}.html`,
    encoding: null
  }
  return get(params)
}

export function parseRyou(body) {
  return body.toString()
    .replace("\t",'')
    .split("\n")
    .map(x => x.trim())
    .map((e, i, a) => {
      // "ryou"の次の行に寮の名前
      if(/ryou/.test(e)) {
        return {
          name: a[i+1].replace(/<.+/,''),
          ryou: e.match(/value="([a|b][1|2]|hai)"/)[1]
        }
      }
    })
    .filter(x => x !==undefined)
}

export default function getAreaList() {
  let area = ['kansai', 'kanto', 'hokkaido', 'kyusyu', 'nagoya', 'sendai']
  return Promise.all(area.map(getAreaHTML)).then((body) => {
    return Array.prototype.concat.apply([], body.map(parseRyou))
  })
}


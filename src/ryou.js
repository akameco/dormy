import Promise from 'bluebird'
import request from 'request'
import {toUTF8} from './util'

function getAreaHTML(area) {
  let params = {
    url: `http://www.dnet.gr.jp/menulist/search/${area}.html`,
    encoding: null
  }

  return new Promise((resolve, reject) => {
    request.get(params, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(new Error(error))
      }
    })
  })
}

function getAllArea() {
  let area = ['kansai', 'kanto', 'hokkaido', 'kyusyu', 'nagoya', 'sendai']
  return Promise.all(area.map(getAreaHTML))
}

export function parseRyou(body) {
  return toUTF8(body)
    .toString()
    .replace("\t",'')
    .split("\n")
    .map(x => x.trim())
    .map((e, i, a) => {
      // "ryou"の次の行に寮の名前
      if(/ryou/.test(e)) {
        return {
          ryou: e.match(/value="([a|b][1|2]|hai)"/)[1],
          name: a[i+1].replace(/<.+/,'')
        }
      }
    })
    .filter(x => x !==undefined)
}

export function getAreaList() {
  return getAllArea().then((body) => {
    return Array.prototype.concat.apply([], body.map(parseRyou))
  })
}


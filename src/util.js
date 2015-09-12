import {Iconv} from 'iconv'
import request from 'request'

export function toUTF8(body) {
  let iconv = new Iconv('sjis', 'utf-8//TRANSLIT//IGNORE')
  return iconv.convert(body)
}

export function post(params) {
  return new Promise((resolve, reject) => {
    request.post(params, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(toUTF8(body))
      } else {
        reject(new Error(error))
      }
    })
  })
}

export function get(params) {
  return new Promise((resolve, reject) => {
    request.get(params, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(toUTF8(body))
      } else {
        reject(new Error(error))
      }
    })
  })
}

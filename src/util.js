import {Iconv} from 'iconv'

export function toUTF8(body) {
  let iconv = new Iconv('sjis', 'utf-8//TRANSLIT//IGNORE')
  return iconv.convert(body)
}


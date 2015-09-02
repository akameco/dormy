import assert from 'power-assert'
import fs from 'fs'
import {Parse} from '../src/parse.js'
import {Iconv} from 'iconv'

describe('Parse-test', () => {
  let file = fs.readFileSync('./mock/index.html')
  let iconv = new Iconv('sjis', 'utf-8')
  let buffer = iconv.convert(file)
  let parse = new Parse(buffer)
  let menu = parse.menus.filter((x) => x.date === '2015-9-2')[0]

  it('朝食の和食メニューが一致すること', () => {
    let t = menu.breakfirst[0]
    assert(t[0] === '豆腐団子と南瓜のそぼろあん' )
  })

  it('朝食の洋食メニューが一致すること', () => {
    let t = menu.breakfirst[1]
    assert(t[0] === 'ホットケーキ')
  })

  it('夕食のメニューが一致すること', () => {
    let t = menu.dinner
    let dinner = [ '魚ムニエルとタンドリーチキン', 'チリビーンズ', 'グリーンサラダ', '御飯', '汁物', '香物' ]
    assert.deepEqual(t, dinner)
  })
})

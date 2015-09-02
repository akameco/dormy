import assert from 'power-assert'
import fs from 'fs'
import {Iconv} from 'iconv'
import {Parse} from '../src/parse.js'
import {getMenu} from '../src/menu.js'
import {parseRyou, getAreaList} from '../src/ryou.js'

describe('メニューのパース', () => {
  let file = fs.readFileSync('./mock/menu.html')
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

describe('寮のパース', () => {
  let file = fs.readFileSync('./mock/ryou.html')
  let list = parseRyou(file)
  let t = list.filter(x => x.name === 'ドーミー新松戸')[0]
  it('名前が一致すること', () => {
    assert(t.name === 'ドーミー新松戸')
  })
  it('寮のタイプが一致すること', () => {
    assert(t.ryou === 'a1')
  })
})

describe('メニューをスクレイピングした結果', () => {
  it('メニューが一致すること',()=>{
    return getMenu('2015-9-2').then((menu)=> {
      assert(menu.dinner[0] === '魚ムニエルとタンドリーチキン')
    })
  })
})

describe('寮をスクレイピングした結果', () => {
  it('寮の名前と種類が一致すること', function() {
    this.timeout(5000)
    return getAreaList().then((list)=> {
      let t = list.filter(x => x.name === 'ドーミー新松戸')[0]
      return assert(t.ryou === 'a1')
    })
  })
})

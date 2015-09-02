import Promise from 'bluebird'
import {Parse} from './parse.js'
import {getAreaList} from './ryou.js'

getAreaList().then((ryouList) => {
  ryouList.forEach((x) => console.log(x.name, x.ryou))
})


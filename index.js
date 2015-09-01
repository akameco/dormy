import cheerio from 'cheerio'
import fs from 'fs'

let file = fs.readFileSync('./mock/index.html','utf8')

let $ = cheerio.load(file.trim())

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

console.log($.html())

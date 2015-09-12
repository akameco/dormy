# dormy
ドーミー系列の寮のメニューをスクレイピングしてJSON形式でパースします。

[dnet｜学生会館・ドーミーの食事献立情報](http://www.dnet.gr.jp/menulist/)

## Install

```
npm install --save dormy
```

## Usage

### 寮のメニューの種類

寮のメニューの種類を取得して保存するサンプルです。

```js
import fs from 'fs'
import path from 'path'
import {Dormy} from 'dormy'

Dormy().then(data => {
  fs.writeFile('dormy.json', JSON.stringify(data, null, 2))
})
```

取得できるjsonは寮の名前とそのメニューの種類の配列になります。  
寮のメニューの種類はa1, a2, b1, b2, haiの５種類です。

```json
{
  "name": "ドーミー福田町",
  "ryou": "a1"
},
{
  "name": "ドーミー二日町",
  "ryou": "hai"
},
{
  "name": "ドーミー八乙女レディース",
  "ryou": "a2"
},
```

### メニューの一覧
プログラム実行時の月の全種類のメニューを取得して保存するサンプルです。

```js
import {Menus} from 'dormy'

Menus().then(data => {
  fs.writeFile('menu.json', JSON.stringify(data, null, 2))
})
```

JSONは以下のように寮のメニューのタイプ、日にち、朝食(和食と洋食の配列)、夕食で構成されてます。  
なお、`breakfirst`の配列の1つ目が和食、2つ目が洋食です。

```json
{
  "a1": {
    "2015-9-1": {
      "breakfirst": [
        [
          "鯖文化干焼き",
          "リオナステーキとキャベツソテー",
          "御飯",
          "汁物",
          "香物"
        ],
        [
          "スクランブルエッグ",
          "フルーツ",
          "パン"
        ]
      ],
      "dinner": [
        "肉けんちんうどん",
        "茄子とはんぺんの味噌焼き",
        "ブロッコリーの和風明太和え",
        "胡麻団子"
      ]
    },
    "2015-9-2": {
      "breakfirst": [
        [
          "豆腐団子と南瓜のそぼろあん",
          "海藻サラダ",
          "御飯",
          "汁物",
          "香物"
        ],
```

取得できるJSONを`data`ディレクトリにサンプルとして用意しました。
参考にしてください。

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT

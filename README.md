# AddExifCreateDate

写真に日時を追加するPhotoshop用スクリプト

- Exif情報があるJPEG画像に対応
- 日時はExifのCreateDateを利用
- L版縁なし印刷時に最適な位置に日時を配置
- フォントサイズを自動調整
- デフォルトフォントはヒラギノ角ゴシック体W8の白を指定

## サンプル

![](./sample/img1-1.jpg)
![](./sample/img2-1.jpg)

## 使い方

- Photoshop起動
- `ファイル -> スクリプト -> 参照 -> AddExifCreateDate.jsx` 選択

## 応用

テキストレイヤーにシャドー等の効果を与えることで好みの形にカスタマイズできます。  

![](./sample/img1-2.jpg)
![](./sample/img2-2.jpg)

### 複数の写真に適用するには？

Photoshopでアクションを組み、バッチ処理でまとめて処理を行います。

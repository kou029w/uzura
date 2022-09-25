# Uzura

Autoinstall USB Flash Drive イメージをビルドするためのツール群

- Ubuntu Server (amd64) ベース
- UEFI のみ対応

## 使い方

1. [Releases](https://github.com/kou029w/uzura/releases) からイメージをダウンロード
2. イメージを USB Flash Drive に書き込む
3. (必要に応じて) USB Flash Drive の中の user-data ファイルを編集して保存
4. UEFI ブートオプションを変更し、起動

## ⚠ 注意

- **起動すると自動的にストレージをフォーマットします。必要に応じてあらかじめバックアップを取ってください。**
- **動作を保証するものではありません。**

## ライセンス

イメージに含まれているソフトウェアの[ライセンス情報](https://packages.ubuntu.com/)をご参照ください。
本リポジトリ内のソフトウェアは CC0-1.0 ライセンスです。

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

## 構成

user-data ファイルを編集して行います。

### ホスト名・ユーザー名・パスワードの設定

user-data ファイルの identity プロパティで指定します。

例:

<!-- prettier-ignore-start -->
```yml
# user-data
  identity:
    # ホスト名
    hostname: hostname
    # ユーザー名
    username: ubuntu
    # パスワードのハッシュ値
    password: "$6$iGfCDHv5HM.ATvx2$2jO1Uf1do6mggo5nvbhB4/kEVwV.gAu8yKjGYHjcIHF.NAMFnXjFUtBW0RVPaxIDDe5yfQ4OXlzuwMBcReMAm/"
```
<!-- prettier-ignore-end -->

パスワードのハッシュ値は `openssl passwd` コマンドなどで生成します。

例:

```console
$ openssl passwd -6
Password:
Verifying - Password:
$6$iGfCDHv5HM.ATvx2$2jO1Uf1do6mggo5nvbhB4/kEVwV.gAu8yKjGYHjcIHF.NAMFnXjFUtBW0RVPaxIDDe5yfQ4OXlzuwMBcReMAm/
```

### SSH 鍵

user-data ファイルの ssh プロパティで指定します。

例:

<!-- prettier-ignore-start -->
```yml
# user-data
  ssh:
    # SSH サーバーのインストール
    install-server: true
    # パスワード認証の無効化
    allow-pw: false
    # SSH 公開鍵
    authorized-keys:
      - "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG4AR5BAWlw5a9RzyTkYK9ApoTerpNg0qb3kMActUyvN"
```
<!-- prettier-ignore-end -->

SSH 公開鍵は `ssh-keygen` コマンドなどで生成します。

例:

```console
$ ssh-keygen -t ed25519
$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG4AR5BAWlw5a9RzyTkYK9ApoTerpNg0qb3kMActUyvN localhost
```

### APT sources.list の設定

user-data ファイルの apt プロパティで指定します。

### APT パッケージのインストール

user-data ファイルの packages プロパティで指定します。

### 初回起動時に 1 度実行するスクリプト

いくつか方法はありますが、ここでは rc-local.service を使う方法を紹介します。
user-data ファイルの late-commands プロパティに下記のようなコマンドを追加します。

例:

<!-- prettier-ignore-start -->
```yml
# user-data
  late-commands:
    - |
      cat <<'EOF' | install /dev/stdin /target/etc/rc.local
      #!/bin/sh
      set -e
      : … ここに初回起動時に実行するコマンドを記述
      # 次回起動時に実行されないようにするためにコマンドの実行に成功したら自身を削除
      rm /etc/rc.local
      EOF
```
<!-- prettier-ignore-end -->

## 参考文献

- [iPXE - open source boot firmware](https://ipxe.org/)
- [Autoinstall Reference](https://ubuntu.com/server/docs/install/autoinstall-reference)

## ライセンス

イメージに含まれているソフトウェアの[ライセンス情報](https://ipxe.org/licensing)をご確認ください。
本リポジトリ内のソフトウェアは CC0-1.0 ライセンスです。

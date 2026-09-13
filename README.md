# Takuma Nishimaki — Portfolio

[tnishimaki.com](https://tnishimaki.com/) のソースコードです。Next.jsの静的エクスポートを使用しています。

## ページ構成

| ページ | URL | 内容 |
| --- | --- | --- |
| About | `/` | プロフィール、提供サービス、主な活動、連絡先 |
| Media | `/media/` | 講演・セミナー、掲載情報、Web発信 |
| Research | `/research/` | 論文・学会発表 |
| Works | `/works/` | Webツール、アプリ、Webサイト |

個別のWebツールは `/tools/` 配下で引き続き公開します。旧ページのURLは新ページへの移動案内として残しています。

## ローカル開発

検証環境はNode.js 22です。

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## 検証と公開用ビルド

開発サーバーを停止してから実行します。開発とビルドで共通の `.next/` を使用するため、同時に実行しないでください。

```sh
node --test tests/chi-square.test.mjs
npm run build
```

公開用ファイルは `out/` に生成されます。ソースコードをGitへpushした後、FileZillaで `out/` の中身を公開ディレクトリにアップロードします。

詳しい差し替え手順と旧ページの扱いは [DEPLOYMENT.md](DEPLOYMENT.md) を参照してください。

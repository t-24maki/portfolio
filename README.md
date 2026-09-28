# Takuma Nishimaki — Portfolio

[tnishimaki.com](https://tnishimaki.com/) のソースコードです。Next.jsの静的エクスポートを使用しています。

## ページ構成

| ページ | URL | 内容 |
| --- | --- | --- |
| About | `/` | プロフィール、支援テーマ、Web発信、講義・講演、掲載情報、論文・学会発表、連絡先 |
| Works | `/works/` | 全作品の一覧と分類タグによる絞り込み |

個別のWebツールは `/tools/` 配下で引き続き公開します。旧ページのURLは新ページへの移動案内として残しています。

過学習シミュレータ（`/tools/overfitting/`）は、学習用・検証用の点を1枚の散布図に重ね、モデルの複雑さによる予測曲線と誤差の変化を比較する教材です。山と谷がある三次曲線から架空データを生成します。計算処理は `lib/overfitting.mjs`、作品一覧の設定は `data/works.js` にあります。

5つのツールのSNS共有画像は `public/images/og/` のJPEG（1200×630px）です。Worksの画像をもとに、画面全体が収まる横長のレイアウトで用意しています。`data/works.js` の `shareImage` を `components/Common/SEO.js` がページのURLに応じて使用し、その他のページはサイト共通画像を使用します。

## ローカル開発

検証環境はNode.js 22です。

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## 検証と公開用ビルド

開発サーバーを停止してから実行します。開発とビルドで共通の `.next/` を使用するため、同時に実行しないでください。

```sh
node --test tests/*.test.mjs
npm run build
```

公開用ファイルは `out/` に生成されます。ソースコードをGitへpushした後、FileZillaで `out/` の中身を公開ディレクトリにアップロードします。

詳しい差し替え手順と旧ページの扱いは [DEPLOYMENT.md](DEPLOYMENT.md) を参照してください。

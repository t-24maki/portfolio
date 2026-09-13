# FileZillaでの公開手順

このサイトはNext.jsの静的エクスポートです。GitHubへのpushはソースコードの更新であり、本番サイトはFileZillaでのアップロード後に更新されます。

## アップロードするファイル

`npm run build` で生成された **`out/` の中身すべて** を、現在の `https://tnishimaki.com/` の公開ディレクトリへ配置してください。公開ディレクトリの名前はサーバーの設定に従います。

配置後は、次のように `index.html` がドメインのルートに対応します。

```text
公開ディレクトリ/
  index.html
  _next/
  images/
  media/index.html
  research/index.html
  works/index.html
  services/index.html
  contact/index.html
  education/index.html
  talks/index.html
  publications/index.html
  tools/index.html
  tools/sample-size/index.html
  tools/ab-test/index.html
  tools/normal-distribution/index.html
  tools/cocyclic/index.html
  sitemap.xml
  robots.txt
  …その他、out/に含まれるファイル
```

ZIPを使う場合はローカルで解凍し、その中身をアップロードしてください。ZIP自体をサーバーに置くだけではサイトは更新されません。

ソースコードの `pages/`、`components/`、`node_modules/`、`.next/`、`.git/` はアップロード対象外です。`out/` はGitの追跡対象外なので、GitHubからソースを取得する場合はビルドが必要です。

## 差し替えの順序

1. 現在の公開ファイルをローカルにバックアップします。サーバー固有の `.htaccess`、認証・証明書用のファイルなども保存してください。
2. 新しい `out/_next/` と `out/images/`、その他の画像・静的ファイルを先にアップロードします。ディレクトリを結合し、同名ファイルを上書きします。**既存の `_next/` を先に削除しないでください。** 更新途中の旧HTMLや、開いたままの旧ページが旧ファイルを参照することがあります。
3. `media/`、`research/`、`works/` と、下表の旧ページ・個別ツールのHTMLをアップロードします。
4. トップページの `index.html` を上書きし、`sitemap.xml`、`robots.txt`、404ページなど残りの `out/` のファイルもアップロードします。FileZillaの転送失敗一覧が空であることを確認します。
5. ブラウザを再読み込みして下記の公開後確認を行います。

公開ディレクトリ全体を削除する必要はありません。サーバー固有の設定ファイルや、このサイト以外のファイルは維持してください。旧ビルドの `_next/` 内のファイルは当面残して問題ありません。整理する場合は、現行ファイルと旧ページが使用するファイルを区別し、キャッシュやロールバックへの影響を確認してから行ってください。

## 統合した旧ページの扱い

**以下の6ページは削除せず、`out/` 内の同じパスのHTMLで上書きします。** 新ページへの自動移動と、移動先へのリンクを表示するページに置き換わります。

| 旧URL | 移動先 |
| --- | --- |
| `/services/` | `/#services`（AboutのWhat I Do） |
| `/contact/` | `/#contact`（Aboutの連絡先） |
| `/education/` | `/media/` |
| `/talks/` | `/media/#talks`（学会発表への別リンクも掲載） |
| `/publications/` | `/research/#papers` |
| `/tools/` | `/works/` |

`/services/#advisory` と `/services/#training` は、それぞれAbout内の該当カードへ移動します。クエリ文字列も引き継ぎます。

**`tools/` フォルダごとは削除しないでください。** `tools/index.html` は移動案内になりますが、その配下の4つの個別ツールは引き続き使用します。

旧6ページは `noindex, follow` と移動先のcanonicalを設定済みで、新しいサイトマップから除外しています。現在の自動移動はJavaScriptによるもので、サーバーのHTTP 301転送ではありません。JavaScriptが無効な場合も移動先のリンクを表示します。

## 公開後の確認

- `/`、`/media/`、`/research/`、`/works/` を直接開き、再読み込みして表示されること。
- What I Doが3項目になっていること、Worksの画像が表示されること、Contactのメールリンクが開くこと。
- 上表の旧URLから新ページへ移動すること。
- `/tools/ab-test/` でA：試行100000・成功10000、B：試行100000・成功20000を入力すると「あり（p<0.0001）」となること。
- `/sitemap.xml` が4つの主要ページと4つの個別ツールを掲載していること。

表示が古い場合はブラウザのキャッシュを避けて再読み込みし、サーバーやCDNのキャッシュがある場合は、その設定に応じて更新してください。

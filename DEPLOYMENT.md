# FileZillaでの公開手順

このサイトはNext.jsの静的エクスポートです。GitHubへのpushはソースコードの更新であり、本番サイトはFileZillaでのアップロード後に更新されます。

## アップロードするファイル

`npm run build` で生成された **`out/` の中身すべて** を、現在の `https://tnishimaki.com/` の公開ディレクトリ `/tnishimaki.com/public_html/` へ配置してください。

配布ZIPを使う場合は、ローカルで解凍し、**中にある `public_html/` の中身すべて** をサーバーの `/tnishimaki.com/public_html/` にアップロードします。`public_html` フォルダを二重に作らないでください。同梱の手順書・リリース情報・チェックサムはアップロード不要です。

配置後は、次のように `index.html` がドメインのルートに対応します。

```text
公開ディレクトリ/
  index.html
  _next/
  images/（共有カード用の og/ を含む）
  media/index.html
  research/index.html
  works/index.html
  services/index.html
  contact/index.html
  education/index.html
  talks/index.html
  publications/index.html
  tools/index.html
  tools/overfitting/index.html
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
3. `works/` と、下表の旧ページ・個別ツールのHTMLをアップロードします。`media/` と `research/` も新しい移動案内のHTMLで上書きします。
4. トップページの `index.html` を上書きし、`sitemap.xml`、`robots.txt`、404ページなど残りの `out/` のファイルもアップロードします。FileZillaの転送失敗一覧が空であることを確認します。
5. ブラウザを再読み込みして下記の公開後確認を行います。

公開ディレクトリ全体を削除する必要はありません。サーバー固有の設定ファイルや、このサイト以外のファイルは維持してください。旧ビルドの `_next/` 内のファイルは当面残して問題ありません。整理する場合は、現行ファイルと旧ページが使用するファイルを区別し、キャッシュやロールバックへの影響を確認してから行ってください。

## 統合した旧ページの扱い

**以下の8ページは削除せず、`out/` 内の同じパスのHTMLで上書きします。** 新ページへの自動移動と、移動先へのリンクを表示するページに置き換わります。

| 旧URL | 移動先 |
| --- | --- |
| `/media/` | `/#channels`（AboutのWeb発信） |
| `/research/` | `/#papers`（Aboutの論文） |
| `/services/` | `/#services`（Aboutの支援テーマ） |
| `/contact/` | `/#contact`（Aboutの連絡先） |
| `/education/` | `/#channels` |
| `/talks/` | `/#talks`（学会発表への別リンクも掲載） |
| `/publications/` | `/#papers` |
| `/tools/` | `/works/` |

`/services/#advisory` と `/services/#training` は、それぞれAbout内の該当カードへ移動します。クエリ文字列も引き継ぎます。

`/media/#talks`、`/media/#press` はAbout内の同名の項目へ、`/media/#courses` は `/#channels` へ移動します。`/research/#papers`、`/research/#presentations` もAbout内の該当項目へ移動します。

**`tools/` フォルダごとは削除しないでください。** `tools/index.html` は移動案内になりますが、その配下の5つの個別ツールは引き続き使用します。

旧8ページは `noindex, follow` と移動先のcanonicalを設定済みで、新しいサイトマップから除外しています。現在の自動移動はJavaScriptによるもので、サーバーのHTTP 301転送ではありません。JavaScriptが無効な場合も移動先のリンクを表示します。

## 公開後の確認

- `/`、`/works/` を直接開き、再読み込みして表示されること。PC・スマートフォンのメニューがAbout／Worksになっていること。
- Aboutに支援テーマ・メディア実績・研究実績がまとまっていること、Worksの画像と分類フィルターが使えること、お問い合わせのメールリンクが開くこと。
- 上表の旧URLから新ページへ移動すること。
- `/tools/ab-test/` でA：試行100000・成功10000、B：試行100000・成功20000を入力すると「あり（p<0.0001）」となること。
- `/tools/overfitting/` で単純・中程度・複雑を切り替えると、同じ点に対して予測曲線と誤差が変わること。Worksの「データ・統計」に含まれること。
- `/sitemap.xml` が2つの主要ページと5つの個別ツールを掲載していること。
- `/images/og/overfitting.jpg`、`sample-size.jpg`、`ab-test.jpg`、`normal-distribution.jpg`、`cocyclic.jpg` が表示されること（いずれも `/images/og/` 配下）。5つのツールページの共有画像はそれぞれの画像を指定しています。
- 過学習シミュレータのページタイトルが「過学習シミュレータ｜オーバーフィッティングをグラフで理解」であること。

表示が古い場合はブラウザのキャッシュを避けて再読み込みし、サーバーやCDNのキャッシュがある場合は、その設定に応じて更新してください。

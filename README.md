# population-graph

[![CI](https://github.com/gssequence/population-graph/workflows/CI/badge.svg)](https://github.com/gssequence/population-graph/actions?query=workflow%3ACI)
[![LICENSE](https://img.shields.io/github/license/gssequence/population-graph)](./LICENSE)

<img width="1680" alt="Screenshot" src="https://user-images.githubusercontent.com/7447366/115166634-24cd6300-a0ef-11eb-9bdd-e7d2c8a97849.png">

都道府県別の総人口推移グラフを表示する Next.js アプリケーションです。都道府県のチェックボックスをオンにすると、その都道府県の人口推移グラフを Recharts を用いて表示します。

## 開発

### 準備

Node.js と npm がインストールされている必要があります。

最初に clone と依存関係のインストールを行います。

```bash
$ git clone https://github.com/gssequence/population-graph.git
$ cd population-graph
$ npm i
```

[RESAS-API](https://opendata.resas-portal.go.jp/) の利用登録を行い、 API キーを取得してください。プロジェクトのルートディレクトリにファイル `.env.development.local` を作成し、開発用の API キーを設定します。

```bash
$ echo RESAS_API_KEY=取得したAPIキー > .env.development.local
```

### 開発サーバーの開始

```bash
$ npm run dev
```

デフォルトでは `localhost:3000` で開発サーバーが開始します。別のポート番号を指定する場合は、代わりに以下を実行します。

```bash
$ npm run dev -- -p 8080
```

この場合、 `localhost:8080` で開発サーバーが開始します。

### Linting

`git commit` 時は Git フックによって、ステージ上のコードに対して自動的に Lint とフォーマットが実行されます。また、下記コマンドによって手動で実行することもできます。

#### `npm run lint`

ESLint でスクリプトの静的解析を行います。

#### `npm run lint:fix`

ESLint でスクリプトの静的解析を行い、 Prettier でスクリプトの自動フォーマットを行います。

#### `npm run stylelint`

stylelint でスタイルシートの静的解析を行います。

#### `npm run stylelint:fix`

stylelint でスタイルシートの静的解析を行い、 Prettier でスタイルシートの自動フォーマットを行います。

### デプロイ

#### Vercel (推奨)

プロジェクトをインポートする際、環境変数 `RESAS_API_KEY` に RESAS-API の API キーを設定してください。

<img width="580" alt="Vercel Environment Variables" src="https://user-images.githubusercontent.com/7447366/115154529-40684780-a0b6-11eb-880a-f18608d189d8.png">

#### Node.js サーバー

最初に、プロジェクトをビルドします。

```bash
$ npm run build
```

環境変数 `RESAS_API_KEY` に RESAS-API の API キーを設定してサーバーを開始します。

```bash
$ RESAS_API_KEY=APIキー npm start
```

デフォルトでは `localhost:3000` でサーバーが開始します。別のポート番号を指定する場合は、代わりに以下を実行するよう設定します。

```bash
$ RESAS_API_KEY=APIキー npm start -- -p 8080
```

この場合、 `localhost:8080` でサーバーが開始します。

## ライセンス

[The MIT License](./LICENSE) でライセンスされています。

## クレジット

このアプリケーションは [RESAS (地域経済分析システム) API](https://opendata.resas-portal.go.jp/) を使用しています。

# 簡易仕様書

### 作者
平田 晃大
### アプリ名
RestaurantSearcher

## 動作対象端末・OS
### 動作対象OS
Chromeブラウザ

## 開発環境
### 開発環境
node v20.12.1
react v18.3.1
next v15.0.3

### 開発言語
typescript v5
tailwindcss v3.4.1

## 開発期間
14日間

## アプリケーション機能

### 機能一覧
- レストラン検索：ホットペッパーグルメサーチAPIを使用して、現在地から近い飲食店を検索する。
- レストラン情報取得：ホットペッパーグルメサーチAPIを使用して、飲食店の詳細情報を取得する。
- マップ表示：googleマップを使用して現在地や現在地から店までの距離を視覚的に表示する。※この機能は実装できませんでした🥹

### 画面一覧
- ホーム画面 ：店の検索,検索結果の一覧,見たい店の詳細情報,マップを1画面上で表示
※マップは実装できませんでした🥹
- リスト画面 ：検索結果の飲食店を一覧表示と選択した店の詳細を表示する。※実装できませんでした🥹
- マップ画面 ：検索結果の飲食店を画面全体のマップに表示する ※実装できませんでした🥹

### 使用しているAPI,SDK,ライブラリ,フレームワークなど

#### API関係
- ホットペッパーグルメサーチAPI
- Geolocation API
#### フロントエンドフレームワーク
- React
- next.js
#### アイコンライブラリ
- FontAwesome
#### HTTPクライアントライブラリ
- axios
#### プログラミング言語/型システム
- TypeScript
#### コード品質ツール
- ESLint
#### スタイリングフレームワーク
- Tailwind CSS

### テーブル定義(ER図)などの設計ドキュメント
- ないです

### コンセプト
今、食べに行きたいお店が見つけれる

### こだわったポイント
APIから受け取った営業時間をそのまま表示する場合に見にくいと感じたので、見やすいように表示するロジックを頑張りました

### デザイン面でこだわったポイント
店の一覧と詳細を１ページでまとめ見やすく配置した

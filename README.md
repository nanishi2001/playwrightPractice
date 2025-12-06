# playwrightPractice

このリポジトリの目的はPlaywrightでのE2Eテストを学習・実践です

## 🛠 技術スタック

- **テストフレームワーク**: Playwright Test v1.49.0+
- **言語**: TypeScript v5.3+. NodeJS v22.21.1
- **パッケージマネージャー**: pnpm v10.24.0
- **リンター**: ESLint + TypeScript ESLint
- **フォーマッター**: Prettier
- **コミットフック**: Husky + lint-staged
- **テスト対象**: Hotel Testplanisphere (デモサイト)

## 📦 セットアップ

### 前提条件

- Node.js 22.21.1
- pnpm 10.24.0

### Node.jsとpnpmのバージョン管理

このプロジェクトはNode.jsとpnpmのバージョンを厳密に管理しています。バージョンが異なる場合は、以下の対処方法を実施してください。

#### Voltaを使用する方法（推奨）

[Volta](https://docs.volta.sh/)を使用すると、プロジェクトごとに異なるバージョンのNode.jsとpnpmを自動的に切り替えることができます。

1. **Voltaのインストール**（初回のみ）

```bash
# macOS/Linux(wsl)
curl https://get.volta.sh | bash

# Windows（PowerShell）
choco install volta
# または
winget install Volta.Volta
```

1. **Voltaの設定確認**

プロジェクトの`package.json`には既に以下のVolta設定が含まれています：

```json
"volta": {
  "node": "22.21.1",
  "pnpm": "10.24.0"
}
```

1. **自動的にバージョンが切り替わります**

Voltaをインストール後、プロジェクトディレクトリで`node`や`pnpm`コマンドを実行すると、自動的に指定されたバージョンに切り替わります。

#### 手動でバージョン管理する方法

Voltaを使用しない場合は、以下のコマンドでバージョンを確認し、必要に応じて切り替えてください。

```bash
# 現在のバージョン確認
node --version
pnpm --version

# Node.jsのバージョン管理ツール（nvm、n、fnm等）を使用してバージョン切り替え
# 例：nvmの場合
nvm use 22.21.1
```

### インストール

```bash
# 依存パッケージのインストール
pnpm install

# Husky フックの設定
pnpm prepare
```

## 🧪 テスト実行

```bash
# すべてのテストを実行
pnpm test

# UIモードでテストを実行（対話的な実行）
pnpm test:ui

# デバッグモードでテストを実行
pnpm test:debug

# テストコードを自動生成
pnpm codegen
```

## 🔍 コード品質

```bash
# ESLintでコードチェック
pnpm lint

# Prettierでコードをフォーマット
pnpm format
```

## 📁 プロジェクト構成

```text
playwrightPractice/
├── tests/                    # テストファイルディレクトリ
│   └── example.spec.ts      # サンプルテスト
├── playwright.config.ts      # Playwright設定ファイル
├── package.json              # プロジェクト設定
├── tsconfig.json             # TypeScript設定
├── eslint.config.ts          # ESLint設定
└── README.md                 # このファイル
```

## 📝 ブラウザ設定

デフォルトではChromiumでテストが実行されます。他のブラウザ(Firefox、WebKit)をサポートする場合は、`playwright.config.ts`の`projects`セクションのコメント行を有効化してください。

## 🎯 主な特徴

- TypeScriptによる型安全なテスト実装
- 複数ブラウザでのテスト対応
- HTML形式のテストレポート生成
- CI/CD環境での自動リトライ設定
- トレース機能による失敗時のデバッグ支援
- Husky + lint-stagedによるコミット前の品質チェック

## 💬 Commitメッセージ規約

このプロジェクトでは[Conventional Commits](https://www.conventionalcommits.org/)に準拠したコミットメッセージを推奨しています。

### Commitメッセージ形式

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### タイプ一覧

- **feat**: 新機能の追加
- **fix**: バグ修正
- **docs**: ドキュメントの変更
- **style**: コードのフォーマット変更（機能的な変更なし）
- **refactor**: 機能的な変更なしのコード改善
- **perf**: パフォーマンス改善
- **test**: テストの追加または修正
- **chore**: ビルドツールやパッケージマネージャーの変更
- **ci**: CI/CD設定の変更

### Pre-commitフックの実行

commitする際、以下の処理が自動的に実行されます：

1. **ESLint**: ステージング済みのコードをリントチェック
2. **Prettier**: ステージング済みのコードをフォーマット

コードにエラーが検出された場合、commitは失敗します。

### Commit-msgフックの検証

commitメッセージが空の場合、以下のエラーが表示されます：

```bash
❌ エラー: commitメッセージが空です

以下の形式でcommitメッセージを記述してください：
  <type>(<scope>): <subject>

例：
  feat(auth): ログイン機能を追加
  fix(button): ボタンのクリック動作を修正
  docs: READMEを更新
```

メッセージが空の場合やエラーが検出された場合、commitは失敗します。

## 🤖 GitHub Actions Workflows

このプロジェクトには、PR管理を自動化するGitHub Actionsワークフローが含まれています。

### Auto Approve PR Workflow

**ファイル**: `.github/workflows/auto-approve-pr.yml`

新しくオープンされたPRに対して自動的にApproveを実施します。

**トリガー条件:**

- PRがオープンされたとき
- PRが再度オープンされたとき
- PRに新しいコミットがプッシュされたとき

**動作:**

1. PRを自動的にApprove
2. PR上にコメントを作成

**除外条件:**

- dependabotのPRは対象外

## 注意点

- WSL + VSCodeを使用している場合、WindowsからではなくWSL側からVSCodeを起動しないと依存関係が適切に処理できず、Imoprt Errorが発生することがある
- voltaのグローバル設定の状況によってはキャッシュの影響で対象のNodeJSやpnpmをインストールしていてもwarningが発生することがある
  その場合は`~/.volta/tools/user/platform.json`に記載されているグローバル設定を修正することで直ることもある

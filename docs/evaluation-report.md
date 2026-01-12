# Evaluation Report: reserve.spec.ts

**評価日**: 2026-01-12  
**対象ファイル**: [reserve.spec.ts](file:///home/nanis/projects/playwrightPractice/tests/reserve.spec.ts)  
**関連ファイル**: [reserve.page.ts](file:///home/nanis/projects/playwrightPractice/pages/reserve.page.ts), [locators.ts](file:///home/nanis/projects/playwrightPractice/pages/locators.ts), [config](file:///home/nanis/projects/playwrightPractice/config)

---

## Executive Summary

`reserve.spec.ts`は、関数型プログラミング原則とPlaywrightベストプラクティスに概ね準拠した高品質なテストコードです。しかし、セキュリティとコード設計の観点でいくつかの改善点が特定されました。

---

## ✅ 良い点（Best Practices）

| カテゴリ                   | 評価       | 詳細                                                  |
| -------------------------- | ---------- | ----------------------------------------------------- |
| **関数型プログラミング**   | ⭐⭐⭐⭐⭐ | `const`のみ使用、イミュータブル設計、ループなし       |
| **Page Object Pattern**    | ⭐⭐⭐⭐⭐ | ロケータ関数を `reserve.page.ts` に分離               |
| **セマンティックロケータ** | ⭐⭐⭐⭐⭐ | `getByRole`, `getByLabel` を優先的に使用              |
| **Web First Assertions**   | ⭐⭐⭐⭐⭐ | `toBeVisible`, `toHaveText`, `toHaveURL` を適切に使用 |
| **ハードコード排除**       | ⭐⭐⭐⭐⭐ | 定数を `locators.ts`, `config` に集約                 |
| **型安全性**               | ⭐⭐⭐⭐☆  | `Readonly<Page>` で引数をイミュータブルに             |

---

## ⚠️ 改善すべき点

### 1. セキュリティ: パスワードハードコード

> [!WARNING]
> **重要度**: 高  
> **ファイル**: `config/local.config.ts`, `config/dev.config.ts`

```typescript
password: 'password',
password: 'pass1234',
```

**リスク**: パスワードがソースコードに埋め込まれ、Gitリポジトリにコミットされています。

**推奨対策**:

- 環境変数 (`process.env.TEST_PASSWORD`) を使用
- `.env` ファイル + `.gitignore` で管理
- CI/CD ではシークレット管理を使用

---

### 2. 設計: `beforeSetup` 関数の冗長性

> [!NOTE]
> **重要度**: 中  
> **ファイル**: `tests/reserve.spec.ts`

```typescript
const beforeSetup = async (page: Readonly<Page>, planId: number) => {
  await page.goto(getReservePageUrlPattern(planId));
  return page; // ← 同じオブジェクトを返している
};
```

**問題点**:

- `page` を引数で受け取り、そのまま返すのは冗長
- `Readonly<Page>` は型レベルの制約であり、実際のmutationは防げない
- `initializedPage` という変数名は誤解を招く

**推奨改善**:

```typescript
const navigateToReservePage = async (page: Page, planId: number): Promise<void> => {
  await page.goto(getReservePageUrlPattern(planId));
};
```

---

### 3. アンチパターン: blurトリガー

> [!CAUTION]
> **重要度**: 中  
> **ファイル**: `tests/reserve.spec.ts`

```typescript
await getPlanTitle(initializedPage).click(); // Trigger blur
```

**問題点**:

- `click()` で blur をトリガーするのは意図が不明確
- ヘディング要素をクリックするのは不自然な操作

**推奨改善**:

```typescript
await getNightsInput(page).blur();
// または
await getNightsInput(page).press('Tab');
```

---

### 4. DRY原則違反: 設定ファイルの重複

> [!NOTE]
> **重要度**: 低  
> **ファイル**: `config/local.config.ts`, `config/dev.config.ts`

2つの設定ファイルがほぼ同一の内容を持っています。

**推奨改善**:

```typescript
// config/base.config.ts
export const baseData = { ... };

// config/dev.config.ts
import { baseData } from './base.config.js';
export const devData = { ...baseData, /* 差分のみ */ };
```

---

### 5. 型安全性: ランタイム検証の欠如

> [!NOTE]
> **重要度**: 中  
> **ファイル**: `tests/reserve.spec.ts`

```typescript
const planId = PLAN_ID_MAP[planName];
```

`PLAN_ID_MAP` は型レベルでは `PlanIdMap` 型で制約されていますが、ランタイムでの防御的プログラミングが不足しています。

**推奨改善**:

```typescript
const planId = PLAN_ID_MAP[planName];
if (planId === undefined) {
  throw new Error(`Unknown plan: ${planName}`);
}
```

---

### 6. テスト網羅性: エラーケース不足

> [!NOTE]
> **重要度**: 低

予約フォームのバリデーションエラー（未入力、不正入力）に対するテストケースがありません。

---

## 📊 総合評価

| 観点                             | スコア     | コメント                       |
| -------------------------------- | ---------- | ------------------------------ |
| **関数型プログラミング準拠**     | ⭐⭐⭐⭐⭐ | 5/5 - 完全準拠                 |
| **Playwrightベストプラクティス** | ⭐⭐⭐⭐☆  | 4/5 - blur処理の改善余地       |
| **セキュリティ**                 | ⭐⭐☆☆☆    | 2/5 - パスワードのハードコード |
| **保守性**                       | ⭐⭐⭐⭐☆  | 4/5 - 設定の重複               |
| **テスト網羅性**                 | ⭐⭐⭐☆☆   | 3/5 - エラーケース不足         |

**総合スコア**: **3.6 / 5.0**

---

## 改善優先度

| 優先度 | 項目                          | 理由                 |
| ------ | ----------------------------- | -------------------- |
| **P0** | パスワードハードコード (#1)   | セキュリティリスク   |
| **P1** | `beforeSetup` リファクタ (#2) | コードの明確性       |
| **P1** | blur トリガー改善 (#3)        | ベストプラクティス   |
| **P2** | 型安全性向上 (#5)             | 防御的プログラミング |
| **P3** | 設定ファイル重複 (#4)         | DRY原則              |
| **P3** | エラーテスト追加 (#6)         | テスト網羅性         |

---
trigger: model_decision
description: 新機能の実装、コードの修正、リファクタリング、テストコード作成
---

# Coding Guidelines

## Role

あなたは世界最高峰 of QA Automation Architectです。
`eslint.config.mts` に準拠し、保守性の高い関数型プログラミング（FP）を用いた Playwright コードを実装してください。

## Principles (FP)

- **Immutable**: 常に `const` を使用し、既存のオブジェクト/配列の変更を禁止してください。
- **No Loops**: `for`, `while` を禁止し、`map`, `filter`, `reduce` 等を使用してください。
- **No Classes**: クラスを禁止し、関数（Factory関数、関数合成）を使用してください。
- **Async**: 並列処理は `Promise.all`、直列処理は `reduce` または再帰を使用してください。

## Playwright Strategy

- **Locator Priority**: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`
- **Assertions**: Web First Assertions を使用し、`waitForTimeout` は禁止します。

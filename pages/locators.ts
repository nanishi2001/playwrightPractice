/**
 * Locator string constants for Japanese UI elements.
 * Centralizes all Japanese strings used in page object locators.
 */

// =============================================================================
// Navigation
// =============================================================================
export const NAV_HOME = 'ホーム' as const;
export const NAV_PLANS = '宿泊予約' as const;
export const NAV_SIGNUP = '会員登録' as const;
export const NAV_LOGIN = 'ログイン' as const;
export const NAV_LOGOUT = 'ログアウト' as const;

// =============================================================================
// Form Labels - Common
// =============================================================================
export const LABEL_EMAIL = 'メールアドレス' as const;
export const LABEL_PASSWORD = 'パスワード' as const;
export const LABEL_PASSWORD_REQUIRED = /^パスワード\s*必須$/;
export const LABEL_PASSWORD_CONFIRM = 'パスワード（確認）' as const;
export const LABEL_USERNAME = '氏名' as const;

// =============================================================================
// Form Labels - Signup
// =============================================================================
export const LABEL_RANK_PREMIUM = 'プレミアム会員' as const;
export const LABEL_RANK_NORMAL = '一般会員' as const;
export const LABEL_ADDRESS = '住所' as const;
export const LABEL_TEL = '電話番号' as const;
export const LABEL_GENDER = '性別' as const;
export const LABEL_BIRTHDAY = '生年月日' as const;
export const LABEL_NOTIFICATION = 'お知らせを受け取る' as const;
export const LABEL_SUBMIT_REGISTER = '登録' as const;

// =============================================================================
// Form Labels - Reserve
// =============================================================================
export const LABEL_DATE_REQUIRED = '宿泊日 必須' as const;
export const LABEL_NIGHTS_REQUIRED = '宿泊数 必須' as const;
export const LABEL_HEADCOUNT_REQUIRED = '人数 必須' as const;
export const LABEL_CONTACT_REQUIRED = '確認のご連絡 必須' as const;
export const LABEL_USERNAME_REQUIRED = '氏名 必須' as const;
export const LABEL_COMMENT = 'ご要望・ご連絡事項等ありましたらご記入ください' as const;
export const LABEL_SUBMIT_CONFIRM = '予約内容を確認する' as const;

// =============================================================================
// Form Labels - Reserve Options
// =============================================================================
export const LABEL_BREAKFAST = '朝食バイキング' as const;
export const LABEL_EARLY_CHECKIN = '昼からチェックインプラン' as const;
export const LABEL_SIGHTSEEING = 'お得な観光プラン' as const;

// =============================================================================
// MyPage Labels
// =============================================================================
export const LABEL_RANK = '会員ランク' as const;
export const LABEL_NOTIFICATION_STATUS = 'お知らせ' as const;
export const BUTTON_ICON_SETTINGS = 'アイコン設定' as const;
export const BUTTON_DELETE_ACCOUNT = '退会する' as const;

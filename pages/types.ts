export type PlanName =
  | 'お得な特典付きプラン'
  | '素泊まり'
  | '出張ビジネスプラン'
  | 'エステ・マッサージプラン'
  | '貸し切り露天風呂プラン'
  | 'カップル限定プラン'
  | 'テーマパーク優待プラン';

export type PlanIdMap = Record<PlanName, number>;

export type SignupFormValues = {
  readonly email?: string;
  readonly password?: string;
  readonly passwordConfirmation?: string;
  readonly username?: string;
  readonly rank?: 'premium' | 'normal';
  readonly address?: string;
  readonly tel?: string;
  readonly gender?: '男性' | '女性' | 'その他' | '未回答';
  readonly birthday?: string; // YYYY-MM-DD
  readonly notification?: boolean;
};

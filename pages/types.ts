export type PlanName =
  | 'お得な特典付きプラン'
  | '素泊まり'
  | '出張ビジネスプラン'
  | 'エステ・マッサージプラン'
  | '貸し切り露天風呂プラン'
  | 'カップル限定プラン'
  | 'テーマパーク優待プラン';

export type PlanIdMap = Record<PlanName, number>;

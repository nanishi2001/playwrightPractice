export const RESERVE_PAGE_PATH = '/ja/reserve.html' as const;
export const RESERVE_PAGE_URL = './reserve.html' as const;

export const getReserveUrlWithPlanId = (planId: number): string =>
  `${RESERVE_PAGE_URL}?plan-id=${planId}`;

export const getReservePageUrlPattern = (planId: number): string =>
  `${RESERVE_PAGE_PATH}?plan-id=${planId}`;

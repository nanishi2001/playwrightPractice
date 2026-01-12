import type { Locator } from '@playwright/test';

/**
 * Safely retrieves text content from a locator.
 * Returns an empty string if textContent is null.
 */
export const getSafeTextContent = async (locator: Readonly<Locator>): Promise<string> =>
  (await locator.textContent()) ?? '';

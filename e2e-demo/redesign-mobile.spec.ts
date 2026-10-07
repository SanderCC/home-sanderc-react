import { test, expect, type Page, type TestInfo } from '@playwright/test';
import { Demo } from './demo-human';

async function shot(page: Page, info: TestInfo, label: string) {
  await info.attach(label, { body: await page.screenshot({ fullPage: false }), contentType: 'image/png' });
}

test.use({ viewport: { width: 390, height: 844 }, video: { mode: 'on', size: { width: 390, height: 844 } } });

test('AC4 — mobile first: no sideways scroll and a full-screen menu', async ({ page }, info) => {
  const demo = await Demo.start(page);
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await demo.open('/', 'On a phone-sized screen the home page fits without sideways scrolling');
  expect(await overflow()).toBeLessThanOrEqual(0);
  await demo.withoutCaption(() => shot(page, info, 'Home at 390 px wide'));
  await demo.click(page.locator('.nav-toggle'), 'The menu opens full screen');
  await expect(page.locator('.menu')).toHaveClass(/menu-open/);
  await page.waitForTimeout(900);
  await demo.withoutCaption(() => shot(page, info, 'Full-screen menu'));
  await demo.click(page.locator('.menu-link', { hasText: 'Portfolio' }), 'We go to the portfolio');
  await expect(page).toHaveURL(/\/portfolio\/?$/);
  await expect(page.locator('.menu')).not.toHaveClass(/menu-open/);
  await demo.scrollBy(700);
  expect(await overflow()).toBeLessThanOrEqual(0);
  await demo.withoutCaption(() => shot(page, info, 'Portfolio at 390 px wide'));
});

import { test } from '@playwright/test';

const states = [
  { name: 'home-desktop', path: '/', w: 1280, h: 800 },
  { name: 'home-mobile', path: '/', w: 390, h: 844 },
  { name: 'portfolio-desktop', path: '/portfolio', w: 1280, h: 800 },
  { name: 'portfolio-mobile', path: '/portfolio', w: 390, h: 844 },
  { name: 'experience-desktop', path: '/experience', w: 1280, h: 800 },
];

test.use({ video: 'off', screenshot: 'off' });

test.describe('capture', () => {
  test.skip(!process.env.DEMO_SHOTS, 'only runs when capturing before/after');

  for (const s of states) {
    test(`capture ${s.name}`, async ({ page }) => {
      await page.setViewportSize({ width: s.w, height: s.h });
      await page.goto(s.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2800);
      await page.screenshot({ path: `${process.env.DEMO_SHOTS}/${s.name}.png`, fullPage: false });
    });
  }
});

import { test, expect, type Locator } from '@playwright/test';

test.use({ video: 'off', screenshot: 'off' });

// The portrait fades to transparent over its bottom ~18%. The coloured circle sits behind the
// photo, so if it reaches into that fade it shows through the (white) shirt and looks like it
// is in front. The circle has to end above where the fade starts.
const FADE_STARTS_AT = 0.82; // keep in sync with the mask in Portrait.css

// Measure the circle from its unrotated layout size: some circles spin, and the bounding box of
// a spinning square is larger than the circle drawn inside it. The centre does not move.
async function gap(photo: Locator, orb: Locator) {
  const p = (await photo.boundingBox())!;
  const o = (await orb.boundingBox())!;
  const layoutHeight = await orb.evaluate((el) => (el as HTMLElement).offsetHeight);
  const fadeStart = p.y + p.height * FADE_STARTS_AT;
  const orbBottom = o.y + o.height / 2 + layoutHeight / 2;
  return { fadeStart, orbBottom, gap: fadeStart - orbBottom };
}

for (const width of [360, 390, 768, 1024, 1280, 1600]) {
  test.describe(`portrait ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test('home: circle ends above the fade', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const r = await gap(page.locator('.hero-photo img'), page.locator('.hero-orb'));
      expect(r.gap, JSON.stringify(r)).toBeGreaterThanOrEqual(4);
    });

    test('about: circle ends above the fade', async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      const r = await gap(page.locator('.about-photo img'), page.locator('.about-orb'));
      expect(r.gap, JSON.stringify(r)).toBeGreaterThanOrEqual(4);
    });
  });
}

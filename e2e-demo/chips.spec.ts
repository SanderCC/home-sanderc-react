import { test, expect } from '@playwright/test';

test.use({ video: 'off', screenshot: 'off' });

// Chip rows must have space between neighbours on every page that renders them, including when
// the page is opened directly (page-level CSS is only loaded for the page being visited).
for (const path of ['/experience', '/education', '/about', '/skills']) {
  test(`chips are spaced on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const boxes = await page.locator('.chip-list .chip, .chip-grid .chip').evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
      })
    );
    expect(boxes.length).toBeGreaterThan(1);
    for (let i = 1; i < boxes.length; i++) {
      const a = boxes[i - 1];
      const b = boxes[i];
      const sameRow = Math.abs(a.y - b.y) < 4;
      if (sameRow) expect(b.x - (a.x + a.w), `${path} chip ${i}`).toBeGreaterThanOrEqual(7);
    }
  });
}

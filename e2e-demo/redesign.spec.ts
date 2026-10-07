import { test, expect, type Page, type TestInfo } from '@playwright/test';
import { Demo } from './demo-human';

async function shot(page: Page, info: TestInfo, label: string) {
  await info.attach(label, { body: await page.screenshot({ fullPage: false }), contentType: 'image/png' });
}

const NEW_PROJECTS = [
  { name: 'W&M Tent Service', href: 'https://wmtentservice.sanderc.net' },
  { name: 'HaspelPlanner', href: 'https://haspelplanner.sanderc.net' },
  { name: 'SupportersClub.net', href: 'https://supportersclub.net' },
  { name: 'KBFKB', href: 'https://kbfkb.be' },
];

test.describe('Redesign', () => {
  test('Walkthrough', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'The new home page: no globe, just a portrait and a living background');
    await demo.moveTo(page.locator('.hero-name'));
    await demo.caption('The name reacts to the cursor: letters swell as it comes near');
    await demo.scrollTo(page.locator('.quick-grid'), 'Cards tilt and light up under the cursor');
    await demo.moveTo(page.locator('.sc').nth(1));
    await demo.moveTo(page.locator('.sc').nth(2));
    await demo.click(page.getByRole('link', { name: 'Portfolio' }).first(), 'On to the portfolio');
    await demo.caption('Four new projects sit next to the existing ones');
    await demo.scrollBy(500);
    await demo.withoutCaption(() => shot(page, info, 'Portfolio with the new projects'));
  });

  test('AC1 — the globe is gone from the home page', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    await demo.moveTo(page.locator('.hero-photo'));
    await demo.caption('Where the globe used to be, there is now a portrait inside a glowing ring');
    await demo.withoutCaption(() => shot(page, info, 'New hero without the globe'));
    await expect(page.locator('.earth, .hero-earth, [class*="earth"]')).toHaveCount(0);
    await expect(page.locator('canvas')).toHaveCount(0);
    await expect(page.locator('.hero-orb')).toBeVisible();
  });

  test('AC2 — my profile picture is on the home page with the background removed', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    const photo = page.locator('.hero-photo img');
    await demo.moveTo(photo);
    await demo.caption('The photo is a cut-out: the colourful ring shows through behind it');
    await demo.withoutCaption(() => shot(page, info, 'Cut-out portrait over the ring'));
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', '/sander.png');
    const corner = await page.evaluate(async () => {
      const img = new Image();
      img.src = '/sander.png';
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      return { w: img.naturalWidth, topLeftAlpha: ctx.getImageData(5, 5, 1, 1).data[3], topRightAlpha: ctx.getImageData(c.width - 5, 5, 1, 1).data[3] };
    });
    expect(corner.w).toBeGreaterThan(0);
    expect(corner.topLeftAlpha).toBe(0);
    expect(corner.topRightAlpha).toBe(0);
  });

  test('AC3 — plenty of modern mouse animations (cards, type, cursor, clicks)', async ({ page }, info) => {
    await page.addInitScript(() => {
      (window as unknown as { __bursts: number }).__bursts = 0;
      new MutationObserver((records) =>
        records.forEach((r) =>
          r.addedNodes.forEach((n) => {
            if ((n as HTMLElement).classList?.contains('burst-dot')) (window as unknown as { __bursts: number }).__bursts++;
          })
        )
      ).observe(document, { childList: true, subtree: true });
    });
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');

    // 1. Variable type reacts to the pointer
    const letter = page.locator('.hero-name [data-l="9"]');
    await demo.moveTo(letter);
    await demo.caption('The letters under the cursor get heavier and wider');
    await expect
      .poll(() => letter.evaluate((el) => Number(/"wght" (\d+)/.exec(getComputedStyle(el).fontVariationSettings)?.[1] ?? 0)))
      .toBeGreaterThan(700);
    await demo.withoutCaption(() => shot(page, info, 'Letters swell under the cursor'));

    // 2. A custom cursor ring follows the pointer
    await expect.poll(() => page.locator('.cursor-ring').evaluate((el) => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.5);

    // 3. Cards tilt on a spring and get a spotlight
    const card = page.locator('.quick-grid .sc').first();
    await demo.scrollTo(page.locator('.quick-grid'), 'The cards tilt toward the cursor');
    await demo.moveTo(card);
    await demo.caption('A spotlight follows the cursor and lights the card border');
    await expect.poll(() => card.evaluate((el) => (el as HTMLElement).style.transform)).toContain('perspective');
    expect(await card.evaluate((el) => (el as HTMLElement).style.getPropertyValue('--sx'))).not.toBe('');
    await demo.withoutCaption(() => shot(page, info, 'Card tilted with spotlight'));

    // 4. Pressing anywhere throws a small particle burst
    await demo.click(page.locator('.quick-title').nth(1), 'Every click throws a small burst of particles');
    expect(await page.evaluate(() => (window as unknown as { __bursts: number }).__bursts)).toBeGreaterThan(0);
  });

  test('AC5 — the Malt link is removed', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    const footer = page.locator('.site-footer');
    await demo.scrollTo(footer, 'The footer links to GitHub, LinkedIn and PayPal only');
    await expect(footer.locator('.social-link')).toHaveText([/GitHub/, /LinkedIn/, /PayPal/]);
    await demo.withoutCaption(() => shot(page, info, 'Footer links'));
    await expect(page.locator('a[href*="malt"]')).toHaveCount(0);
    await expect(footer).not.toContainText('Malt');
    await demo.click(page.getByRole('link', { name: 'About' }).first(), 'Same on the other pages');
    await expect(page.locator('a[href*="malt"]')).toHaveCount(0);
  });

  test('AC6 — four new projects in the portfolio', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    await demo.click(page.getByRole('link', { name: 'Portfolio' }).first(), 'We open the portfolio');
    await expect(page.locator('.project')).toHaveCount(7);
    for (const p of NEW_PROJECTS) {
      const card = page.locator('article.sc', { has: page.getByRole('heading', { name: p.name, exact: true }) });
      await demo.scrollTo(card, `${p.name}`);
      await expect(card.locator('a.project-link')).toHaveAttribute('href', p.href);
    }
    await demo.withoutCaption(() => shot(page, info, 'New projects in the grid'));
  });

  test('AC7 — Bel\'Maison links to belmaison-seo.sanderc.net/en', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    await demo.click(page.getByRole('link', { name: 'Portfolio' }).first(), 'We open the portfolio');
    const card = page.locator('article.sc', { has: page.getByRole('heading', { name: "Bel'Maison", exact: true }) });
    await demo.scrollTo(card, "The Bel'Maison card");
    await demo.moveTo(card.locator('a.project-link'));
    await demo.withoutCaption(() => shot(page, info, "Bel'Maison card"));
    await expect(card.locator('a.project-link')).toHaveAttribute('href', 'https://belmaison-seo.sanderc.net/en');
  });

  test('AC8 — CITRadio is tagged .NET', async ({ page }, info) => {
    const demo = await Demo.start(page);
    await demo.open('/', 'We open the home page');
    await demo.click(page.getByRole('link', { name: 'Portfolio' }).first(), 'We open the portfolio');
    const card = page.locator('article.sc', { has: page.getByRole('heading', { name: 'CITRadio DJ Platform' }) });
    await demo.scrollTo(card, 'The CITRadio DJ Platform card');
    await demo.withoutCaption(() => shot(page, info, 'CITRadio tags'));
    await expect(card.locator('.chip')).toHaveText(['React', '.NET']);
  });
});

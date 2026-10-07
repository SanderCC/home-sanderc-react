/**
 * Human-like driving for demo videos: a visible cursor that glides along curved paths, a click
 * ripple, wheel scrolling that eases in and out, typing with per-key delays, and subtitles.
 *
 * Tempo: with video recording on, every Playwright call is a round trip that costs far more than
 * its nominal delay (a 16 ms wait per mouse step or per key made a 13-character field take 8 s).
 * So movements are animated inside the page in one call, and typing is a single `keyboard.type`
 * with its key delay applied by the driver.
 *
 * Playwright's recorded video shows no cursor and every `locator.click()` / `fill()` / `goto()`
 * jumps instantly (it even auto-scrolls the target into view). In demo specs, drive the page ONLY
 * through this class; locators are still fine for reading state and for assertions.
 *
 * Usage:
 *   const demo = await Demo.start(page);                 // once per test, before the first goto
 *   await demo.open('/products', 'We openen de productlijst');
 *   await demo.click(page.getByRole('button', { name: 'Category' }), 'We openen de categoriefilter');
 *   await demo.type(page.getByLabel('Search'), 'shoes', 'We zoeken op "shoes"');
 *   await demo.scrollTo(page.getByRole('heading', { name: 'Results' }), 'We scrollen naar de resultaten');
 */
import type { Locator, Page } from "@playwright/test";

type Point = { x: number; y: number };

const STATE_KEY = "__demo_overlay_state";

/** Runs inside every document of the context (added with addInitScript). */
function overlayScript(stateKey: string) {
  const load = () => {
    try {
      return JSON.parse(sessionStorage.getItem(stateKey) ?? "{}");
    } catch {
      return {};
    }
  };
  const save = (patch: Record<string, unknown>) => {
    try {
      sessionStorage.setItem(stateKey, JSON.stringify({ ...load(), ...patch }));
    } catch {
      /* storage unavailable: overlay still works, just doesn't survive navigation */
    }
  };

  const css = `
    #__demo-cursor{position:fixed;left:-50px;top:-50px;width:24px;height:24px;z-index:2147483647;pointer-events:none;
      transform-origin:3px 2px;transition:transform .09s ease-out}
    #__demo-cursor svg{display:block;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))}
    #__demo-cursor.down{transform:scale(.82)}
    .__demo-ripple{position:fixed;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:3px solid #ffb300;
      background:rgba(255,179,0,.35);z-index:2147483646;pointer-events:none;animation:__demo-ripple .65s ease-out forwards}
    @keyframes __demo-ripple{to{transform:scale(3.4);opacity:0}}
    #__demo-caption{position:fixed;left:50%;bottom:32px;transform:translateX(-50%);max-width:min(88vw,960px);box-sizing:border-box;
      padding:10px 20px;border-radius:10px;background:rgba(12,12,12,.84);color:#fff;
      font:500 21px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center;
      z-index:2147483646;pointer-events:none;transition:opacity .25s}
    #__demo-caption:empty{opacity:0;padding:0}
    #__demo-caption.__hidden{opacity:0}
  `;

  const ensure = () => {
    if (!document.body) return;
    if (!document.getElementById("__demo-style")) {
      const style = document.createElement("style");
      style.id = "__demo-style";
      style.textContent = css;
      (document.head ?? document.body).appendChild(style);
    }
    let cursor = document.getElementById("__demo-cursor");
    let caption = document.getElementById("__demo-caption");
    const state = load();
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.id = "__demo-cursor";
      cursor.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 2 L3 19 L7.6 14.8 L10.8 21.6 L13.7 20.3 L10.6 13.6 L17 13.6 Z" ' +
        'fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg>';
      if (typeof state.x === "number") {
        cursor.style.left = `${state.x}px`;
        cursor.style.top = `${state.y}px`;
      }
      document.body.appendChild(cursor);
    }
    if (!caption) {
      caption = document.createElement("div");
      caption.id = "__demo-caption";
      caption.textContent = state.caption ?? "";
      document.body.appendChild(caption);
    }
  };

  // Frameworks that hydrate or re-render <body> can drop foreign nodes - put them back.
  document.addEventListener("DOMContentLoaded", ensure);
  setInterval(ensure, 250);

  addEventListener(
    "mousemove",
    (e) => {
      ensure();
      const cursor = document.getElementById("__demo-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
      save({ x: e.clientX, y: e.clientY });
    },
    true
  );
  addEventListener(
    "mousedown",
    (e) => {
      ensure();
      document.getElementById("__demo-cursor")?.classList.add("down");
      const ripple = document.createElement("div");
      ripple.className = "__demo-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    },
    true
  );
  addEventListener("mouseup", () => document.getElementById("__demo-cursor")?.classList.remove("down"), true);

  // Animates the overlay cursor along a quadratic curve in one round trip; the real mouse then
  // jumps to the end point, which also lands the cursor there (see the mousemove listener).
  // Scrolls whatever the wheel would scroll at (x, y) - the nearest scrollable ancestor of the element
  // under the cursor, else the page - frame by frame with ease-in-out, in one round trip. Separate
  // wheel events from Playwright arrive as visible jumps on the recording.
  (window as unknown as Record<string, unknown>).__demoScroll = (x: number, y: number, deltaY: number, duration: number) =>
    new Promise<void>((resolve) => {
      const page = (document.scrollingElement ?? document.documentElement) as HTMLElement;
      let el: HTMLElement | null = document.elementFromPoint(x, y) as HTMLElement | null;
      while (el && el !== page && el !== document.body) {
        const overflow = getComputedStyle(el).overflowY;
        const room = deltaY > 0 ? el.scrollHeight - el.clientHeight - el.scrollTop : el.scrollTop;
        if ((overflow === "auto" || overflow === "scroll") && room > 1) break;
        el = el.parentElement;
      }
      const target = el && el !== document.body ? el : page;
      const startTop = target.scrollTop;
      const endTop = Math.max(0, Math.min(target.scrollHeight - target.clientHeight, startTop + deltaY));
      if (endTop === startTop) return resolve();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const start = performance.now();
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // "instant" overrides a site's `scroll-behavior: smooth`, which would fight the per-frame steps.
        target.scrollTo({ top: startTop + (endTop - startTop) * ease(t), behavior: "instant" as ScrollBehavior });
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

  (window as unknown as Record<string, unknown>).__demoGlide = (
    from: { x: number; y: number },
    ctrl: { x: number; y: number },
    to: { x: number; y: number },
    duration: number
  ) =>
    new Promise<void>((resolve) => {
      ensure();
      const cursor = document.getElementById("__demo-cursor");
      if (!cursor || duration <= 0) return resolve();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const start = performance.now();
      const frame = (now: number) => {
        const t = ease(Math.min(1, (now - start) / duration));
        cursor.style.left = `${(1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * ctrl.x + t * t * to.x}px`;
        cursor.style.top = `${(1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * ctrl.y + t * t * to.y}px`;
        if (now - start < duration) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

  (window as unknown as Record<string, unknown>).__demoCaption = (text: string) => {
    ensure();
    const caption = document.getElementById("__demo-caption");
    if (caption) caption.textContent = text;
    save({ caption: text });
  };
  (window as unknown as Record<string, unknown>).__demoCaptionVisible = (visible: boolean) => {
    document.getElementById("__demo-caption")?.classList.toggle("__hidden", !visible);
  };
}

const sleep = (page: Page, ms: number) => page.waitForTimeout(ms);
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export class Demo {
  private pos: Point;

  private constructor(private readonly page: Page) {
    const vp = page.viewportSize() ?? { width: 1280, height: 720 };
    this.pos = { x: Math.round(vp.width * 0.55), y: Math.round(vp.height * 0.6) };
  }

  /** Installs the overlay for this page's context. Call before the first navigation. */
  static async start(page: Page): Promise<Demo> {
    await page.context().addInitScript(overlayScript, STATE_KEY);
    return new Demo(page);
  }

  /**
   * Opens a URL. Use it once, at the start of a test - after that, navigate by clicking links like
   * a visitor would. The caption is shown while the page loads.
   */
  async open(url: string, text?: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle").catch(() => {});
    await this.page.mouse.move(this.pos.x, this.pos.y);
    if (text) await this.caption(text);
    else await sleep(this.page, 600);
  }

  /** Shows a subtitle and keeps it up long enough to read (about 45 ms per character, min 1.2 s). */
  async caption(text: string, holdMs?: number) {
    await this.page.evaluate((t) => (window as unknown as { __demoCaption?: (t: string) => void }).__demoCaption?.(t), text);
    await sleep(this.page, holdMs ?? Math.max(1200, text.length * 45));
  }

  /** Clears the subtitle. */
  async clearCaption() {
    await this.page.evaluate(() => (window as unknown as { __demoCaption?: (t: string) => void }).__demoCaption?.(""));
  }

  async pause(ms = 800) {
    await sleep(this.page, ms);
  }

  /** Glides the cursor to the element (scrolling it into view first, by wheel). */
  async moveTo(target: Locator) {
    await target.waitFor({ state: "visible" });
    await this.scrollIntoView(target);
    const box = await target.boundingBox();
    if (!box) throw new Error("demo.moveTo: element has no bounding box");
    const to = {
      x: box.x + box.width * rand(0.4, 0.6),
      y: box.y + box.height * rand(0.4, 0.6),
    };
    await this.glide(to);
  }

  /** Moves to the element, pauses briefly like a person aiming, then presses and releases. */
  async click(target: Locator, text?: string) {
    if (text) await this.caption(text, 600);
    await this.moveTo(target);
    await sleep(this.page, rand(100, 180));
    await this.page.mouse.down();
    await sleep(this.page, 60);
    await this.page.mouse.up();
    await sleep(this.page, 250);
  }

  /**
   * Clicks into a field and types at a brisk human pace (~45 ms per key). One `keyboard.type` call:
   * a round trip per key would make each character take several hundred ms on video.
   */
  async type(target: Locator, value: string, text?: string) {
    await this.click(target, text);
    await this.page.keyboard.type(value, { delay: 45 });
    await sleep(this.page, 200);
  }

  /** Presses a key (e.g. "Escape" to close a menu) with a short pause around it. */
  async press(key: string, text?: string) {
    if (text) await this.caption(text, 600);
    await sleep(this.page, 120);
    await this.page.keyboard.press(key);
    await sleep(this.page, 250);
  }

  /** Scrolls with the mouse wheel until the element sits comfortably in view. */
  async scrollTo(target: Locator, text?: string) {
    if (text) await this.caption(text, 600);
    await target.waitFor({ state: "visible" });
    await this.scrollIntoView(target, true);
    await sleep(this.page, 250);
  }

  /**
   * Scrolls by a distance in pixels (positive = down), eased like a trackpad flick. The container
   * under the cursor scrolls, as with a real wheel; the animation runs in the page (see __demoScroll).
   */
  async scrollBy(deltaY: number) {
    const duration = Math.min(900, 300 + Math.abs(deltaY) * 0.5);
    await this.page
      .evaluate(
        ([x, y, d, ms]) =>
          (window as unknown as { __demoScroll?: (x: number, y: number, d: number, ms: number) => Promise<void> }).__demoScroll?.(x, y, d, ms),
        [this.pos.x, this.pos.y, deltaY, duration] as const
      )
      .catch(() => {}); // a navigation mid-scroll just ends it
  }

  /** Hides the subtitle for a clean screenshot, then restores it. The cursor stays visible. */
  async withoutCaption<T>(fn: () => Promise<T>): Promise<T> {
    const toggle = (v: boolean) =>
      this.page.evaluate((vis) => (window as unknown as { __demoCaptionVisible?: (v: boolean) => void }).__demoCaptionVisible?.(vis), v);
    await toggle(false);
    try {
      return await fn();
    } finally {
      await toggle(true);
    }
  }

  private async scrollIntoView(target: Locator, center = false) {
    const vp = this.page.viewportSize() ?? { width: 1280, height: 720 };
    // Keep clear of sticky headers at the top and the subtitle at the bottom.
    const top = vp.height * 0.18;
    const bottom = vp.height * 0.72;
    let box = await target.boundingBox();
    for (let i = 0; i < 8 && box; i++) {
      const mid = box.y + box.height / 2;
      const inView = center ? Math.abs(mid - vp.height * 0.45) < vp.height * 0.12 : mid > top && mid < bottom;
      if (inView) return;
      // The wheel scrolls whatever is under the cursor, so make sure it rests over the page content.
      await this.scrollBy(Math.round(mid - vp.height * 0.45));
      await sleep(this.page, 60);
      const next = await target.boundingBox();
      // Didn't move: the page is already at its top or bottom (e.g. a field near the top of the
      // page), so this is as close as it gets. Without this check every such click burned seconds
      // on wheel animations that scroll nothing.
      if (!next || Math.abs(next.y - box.y) < 2) return;
      box = next;
    }
  }

  /**
   * Moves the cursor along a slightly curved path with ease-in-out timing. The overlay cursor is
   * animated inside the page (one round trip, a true 60 fps); the real mouse follows in one jump.
   */
  private async glide(to: Point) {
    const from = this.pos;
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    if (dist < 2) return;
    const duration = Math.min(700, 220 + dist * 0.5); // ms: short hops are quick, long ones slower
    // One control point off the straight line gives the natural arc of a wrist movement.
    const bend = rand(-0.18, 0.18) * dist;
    const nx = -(to.y - from.y) / dist;
    const ny = (to.x - from.x) / dist;
    const ctrl = { x: (from.x + to.x) / 2 + nx * bend, y: (from.y + to.y) / 2 + ny * bend };
    await this.page
      .evaluate(
        ([f, c, t, d]) =>
          (window as unknown as { __demoGlide?: (f: Point, c: Point, t: Point, d: number) => Promise<void> }).__demoGlide?.(f, c, t, d),
        [from, ctrl, to, duration] as const
      )
      .catch(() => {}); // a navigation mid-glide just skips the animation
    await this.page.mouse.move(to.x, to.y);
    this.pos = to;
  }
}

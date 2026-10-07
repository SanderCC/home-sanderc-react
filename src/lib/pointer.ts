/**
 * One shared window pointer listener and one shared rAF ticker, so every
 * mouse-reactive component reads the same state instead of attaching its own.
 */
export interface PointerState {
    x: number;
    y: number;
    active: boolean;
    touch: boolean;
    down: boolean;
    interactive: boolean;
}

const state: PointerState = { x: -9999, y: -9999, active: false, touch: false, down: false, interactive: false };
let attached = false;

const INTERACTIVE = "a,button,[role=button],input,select,textarea,[data-cursor]";

function attach() {
    if (attached || typeof window === "undefined") return;
    attached = true;

    const move = (e: PointerEvent) => {
        state.x = e.clientX;
        state.y = e.clientY;
        state.active = true;
        state.touch = e.pointerType !== "mouse";
        state.interactive = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener(
        "pointerdown",
        (e) => {
            move(e);
            state.down = true;
        },
        { passive: true }
    );
    const up = (e: PointerEvent) => {
        state.down = false;
        if (e.pointerType !== "mouse") state.active = false;
    };
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => {
        state.active = false;
    });
}

export function getPointer(): PointerState {
    attach();
    return state;
}

export function prefersReducedMotion(): boolean {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type FrameCallback = (time: number, dt: number) => void;
const frameCallbacks = new Set<FrameCallback>();
let raf = 0;
let last = 0;

function tick(time: number) {
    const dt = Math.min(64, time - (last || time));
    last = time;
    frameCallbacks.forEach((cb) => cb(time, dt));
    raf = frameCallbacks.size ? requestAnimationFrame(tick) : 0;
    if (!raf) last = 0;
}

export function subscribeFrame(cb: FrameCallback): () => void {
    attach();
    frameCallbacks.add(cb);
    if (!raf) raf = requestAnimationFrame(tick);
    return () => {
        frameCallbacks.delete(cb);
    };
}

/** Frame-rate independent smoothing factor (0..1) for a given time constant in ms. */
export function smooth(dt: number, ms: number): number {
    return 1 - Math.exp(-dt / ms);
}

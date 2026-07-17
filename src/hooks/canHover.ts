export function canHover(): boolean {
    if (typeof window === "undefined") return false;
    return (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

import { useCallback, useMemo, useState } from "react";

export const THEME_TOKEN_KEYS = [
  "--c-icon",
  "--c-text",
  "--c-btn2-text",
  "--c-btn2-hover-bg",
  "--c-btn-hover-bg",
  "--c-bg",
  "--c-secondary-text",
  "--c-btn-hover-text",
  "--c-dropdown",
  "--c-btn-bg",
  "--c-surface",
  "--c-card",
  "--c-btn-text",
  "--c-btn2-bg",
  "--c-btn2-hover-text",
  "--c-danger-text",
  "--c-danger-hover-text",
  "--c-danger-bg",
  "--c-danger-hover-bg",
] as const;

export type ThemeVars = Record<(typeof THEME_TOKEN_KEYS)[number], string>;

export const DEFAULT_THEME_VARS: ThemeVars = {
  "--c-icon": "#788257",
  "--c-text": "#788257",
  "--c-btn2-text": "#788257",
  "--c-btn2-hover-bg": "#788257",

  "--c-btn-hover-bg": "#57825B",
  "--c-secondary-text": "#578258",

  "--c-bg": "#DAF1C4",
  "--c-btn-hover-text": "#DAF1C4",

  "--c-dropdown": "#CEE5A3",

  "--c-btn-bg": "#BBD26E",

  "--c-surface": "#E9F3C8",

  "--c-card": "#F6FFD8",
  "--c-btn-text": "#F6FFD8",
  "--c-btn2-bg": "#F6FFD8",
  "--c-btn2-hover-text": "#F6FFD8",
  "--c-danger-text": "#F6FFD8",

  "--c-danger-hover-text": "#F9F0A9",

  "--c-danger-bg": "#D29D6E",

  "--c-danger-hover-bg": "#99380F",
};

export const readRootThemeVars = (): ThemeVars => {
  const styles = getComputedStyle(document.documentElement);
  const out = { ...DEFAULT_THEME_VARS } as ThemeVars;

  THEME_TOKEN_KEYS.forEach((k) => {
    const v = styles.getPropertyValue(k).trim();
    if (v) out[k] = v.toUpperCase();
  });

  return out;
};

export const DEFAULT_COLORS = [
  { hex: "#788257", usage: "icon / main text / dropdown text / button 2 text / button 2 hover background", key: "block_1" },
  { hex: "#57825B", usage: "secondary text / button 1 hover background", key: "block_2" },
  { hex: "#DAF1C4", usage: "background / button 1 hover text", key: "block_3" },
  { hex: "#CEE5A3", usage: "drop down card", key: "block_4" },
  { hex: "#BBD26E", usage: "button 1 background / dropdown hover background", key: "block_5" },
  { hex: "#E9F3C8", usage: "surface", key: "block_6" },
  { hex: "#F6FFD8", usage: "card / button 1 text / dropdown hover text / button 2 background / button 2 hover text / button 3 text", key: "block_7" },
  { hex: "#F9F0A9", usage: "button 3 hover text", key: "block_8" },
  { hex: "#D29D6E", usage: "button 3 background", key: "block_9" },
  { hex: "#99380F", usage: "button 3 hover background", key: "block_10" },
] as const;

export type PaletteItem = {
  hex: string;
  usage: string;
  key: string;
};

export const themeVarsToPalette = (vars: ThemeVars): PaletteItem[] => {
  const mapping = [
    // block_1 -> 主色（icon/text/btn2 text/btn2 hover bg）
    { key: "block_1", usage: DEFAULT_COLORS[0].usage, token: "--c-icon" as const },

    // block_2 -> 次色（btn1 hover bg）
    { key: "block_2", usage: DEFAULT_COLORS[1].usage, token: "--c-btn-hover-bg" as const },

    // block_3 -> 背景/btn1 hover text
    { key: "block_3", usage: DEFAULT_COLORS[2].usage, token: "--c-bg" as const },

    // block_4 -> dropdown card
    { key: "block_4", usage: DEFAULT_COLORS[3].usage, token: "--c-dropdown" as const },

    // block_5 -> btn1 bg
    { key: "block_5", usage: DEFAULT_COLORS[4].usage, token: "--c-btn-bg" as const },

    // block_6 -> surface
    { key: "block_6", usage: DEFAULT_COLORS[5].usage, token: "--c-surface" as const },

    // block_7 -> card / btn text / btn2 bg / danger text
    { key: "block_7", usage: DEFAULT_COLORS[6].usage, token: "--c-card" as const },

    // block_8 -> danger hover text
    { key: "block_8", usage: DEFAULT_COLORS[7].usage, token: "--c-danger-hover-text" as const },

    // block_9 -> danger bg
    { key: "block_9", usage: DEFAULT_COLORS[8].usage, token: "--c-danger-bg" as const },

    // block_10 -> danger hover bg
    { key: "block_10", usage: DEFAULT_COLORS[9].usage, token: "--c-danger-hover-bg" as const },
  ] as const;

  return mapping.map((m) => ({
    key: m.key,
    usage: m.usage,
    hex: (vars[m.token] || DEFAULT_THEME_VARS[m.token]).toUpperCase(),
  }));
};

export const useThemePalette = () => {
  const init = useMemo(() => {
    const rootVars = readRootThemeVars();
    const p = themeVarsToPalette(rootVars);
    return {
      palette: p,
      activeIndex: 0 as number,
      hexColor: (p[0]?.hex ?? "#FFFFFF").toUpperCase(),
    };
  }, []);

  const [palette, setPalette] = useState<PaletteItem[]>(init.palette);
  const [activeIndex, setActiveIndex] = useState<number | null>(init.activeIndex);
  const [hexColor, setHexColor] = useState(init.hexColor);

  const selectBlock = useCallback((i: number, hex: string) => {
    setActiveIndex(i);
    setHexColor(hex.toUpperCase());
  }, []);

  const setCurrentHex = useCallback(
    (hex: string) => {
      const upper = hex.toUpperCase();
      setHexColor(upper);

      setPalette((prev) => {
        if (activeIndex === null) return prev;
        return prev.map((c, idx) => (idx === activeIndex ? { ...c, hex: upper } : c));
      });
    },
    [activeIndex]
  );

  const reset = useCallback(() => {
    const fresh = DEFAULT_COLORS.map((c) => ({ ...c }));
    setPalette(fresh);
    setActiveIndex(0);
    setHexColor(fresh[0].hex.toUpperCase());
  }, []);

  const cssVars = useMemo((): React.CSSProperties => {
    if (palette.length < 10) return {};

    const b1 = palette[0].hex; // block_1
    const b2 = palette[1].hex; // block_2
    const b3 = palette[2].hex; // block_3
    const b4 = palette[3].hex; // block_4
    const b5 = palette[4].hex; // block_5
    const b6 = palette[5].hex; // block_6
    const b7 = palette[6].hex; // block_7
    const b8 = palette[7].hex; // block_8
    const b9 = palette[8].hex; // block_9
    const b10 = palette[9].hex; // block_10

    return {
      // base
      ["--c-icon" as any]: b1,
      ["--c-text" as any]: b1,
      ["--c-bg" as any]: b3,
      ["--c-card" as any]: b7,
      ["--c-surface" as any]: b6,
      ["--c-dropdown" as any]: b4,
      ["--c-secondary-text" as any]: b2,

      // button 1
      ["--c-btn-bg" as any]: b5,
      ["--c-btn-hover-bg" as any]: b2,
      ["--c-btn-text" as any]: b7,
      ["--c-btn-hover-text" as any]: b3,

      // button 2
      ["--c-btn2-bg" as any]: b7,
      ["--c-btn2-text" as any]: b1,
      ["--c-btn2-hover-bg" as any]: b1,
      ["--c-btn2-hover-text" as any]: b7,

      // danger (button 3)
      ["--c-danger-bg" as any]: b9,
      ["--c-danger-hover-bg" as any]: b10,
      ["--c-danger-text" as any]: b7,
      ["--c-danger-hover-text" as any]: b8,
    };
  }, [palette]);

  const themeVars = useMemo(() => {
    const out: Record<string, string> = {};
    Object.entries(cssVars).forEach(([k, v]) => {
      if (typeof v === "string") out[k] = v;
    });
    return out;
  }, [cssVars]);

  const copyHex = useCallback(async () => {
    await navigator.clipboard.writeText(hexColor);
  }, [hexColor]);

  return {
    palette,
    activeIndex,
    hexColor,
    cssVars,
    themeVars,
    selectBlock,
    setCurrentHex,
    reset,
    copyHex,
    setPalette,
  };
};
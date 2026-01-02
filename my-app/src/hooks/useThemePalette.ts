import { useCallback, useMemo, useState } from "react";

export const THEME_TOKEN_KEYS = [
  "--c-icon",
  "--c-main-text",
  "--c-dropdown-text",
  "--c-button",
  "--c-dropdown-hover-bg",
  "--c-button-hover-text",
  "--c-secondary-text",
  "--c-button-hover-bg",
  "--c-dropdown-card",
  "--c-bg",
  "--c-prompt",
  "--c-card",
  "--c-button-text",
  "--c-dropdown-hover-text",
] as const;

export type ThemeVars = Record<(typeof THEME_TOKEN_KEYS)[number], string>;

export const DEFAULT_THEME_VARS: ThemeVars = {
  "--c-icon": "#788257",
  "--c-main-text": "#788257",
  "--c-dropdown-text": "#788257",

  "--c-button": "#BBD26E",
  "--c-dropdown-hover-bg": "#BBD26E",

  "--c-button-hover-text": "#57825B",
  "--c-secondary-text": "#57825B",

  "--c-button-hover-bg": "#A8CD98",

  "--c-dropdown-card": "#CEE5A3",
  "--c-bg": "#DAF1C4",
  "--c-prompt": "#E9F3C8",

  "--c-card": "#F6FFD8",
  "--c-button-text": "#F6FFD8",
  "--c-dropdown-hover-text": "#F6FFD8",
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
  { hex: "#788257", usage: "icon / main text / dropdown text", key: "block_1" },
  { hex: "#BBD26E", usage: "button / dropdown hover background", key: "block_2" },
  { hex: "#57825B", usage: "button hover text / secondary text", key: "block_3" },
  { hex: "#A8CD98", usage: "button hover background", key: "block_4" },
  { hex: "#CEE5A3", usage: "drop down card", key: "block_5" },
  { hex: "#DAF1C4", usage: "background", key: "block_6" },
  { hex: "#E9F3C8", usage: "prompt", key: "block_7" },
  { hex: "#F6FFD8", usage: "card / button text / dropdown hover text", key: "block_8" },
] as const;

export type PaletteItem = {
  hex: string;
  usage: string;
  key: string;
};

export const themeVarsToPalette = (vars: ThemeVars): PaletteItem[] => {
  const mapping = [
    { key: "block_1", usage: DEFAULT_COLORS[0].usage, token: "--c-icon" as const },
    { key: "block_2", usage: DEFAULT_COLORS[1].usage, token: "--c-button" as const },
    { key: "block_3", usage: DEFAULT_COLORS[2].usage, token: "--c-secondary-text" as const },
    { key: "block_4", usage: DEFAULT_COLORS[3].usage, token: "--c-button-hover-bg" as const },
    { key: "block_5", usage: DEFAULT_COLORS[4].usage, token: "--c-dropdown-card" as const },
    { key: "block_6", usage: DEFAULT_COLORS[5].usage, token: "--c-bg" as const },
    { key: "block_7", usage: DEFAULT_COLORS[6].usage, token: "--c-prompt" as const },
    { key: "block_8", usage: DEFAULT_COLORS[7].usage, token: "--c-card" as const },
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
    if (palette.length < 8) return {};
    return {
      ["--c-icon" as any]: palette[0].hex,
      ["--c-main-text" as any]: palette[0].hex,
      ["--c-dropdown-text" as any]: palette[0].hex,

      ["--c-button" as any]: palette[1].hex,
      ["--c-dropdown-hover-bg" as any]: palette[1].hex,

      ["--c-button-hover-text" as any]: palette[2].hex,
      ["--c-secondary-text" as any]: palette[2].hex,

      ["--c-button-hover-bg" as any]: palette[3].hex,
      ["--c-dropdown-card" as any]: palette[4].hex,
      ["--c-bg" as any]: palette[5].hex,
      ["--c-prompt" as any]: palette[6].hex,

      ["--c-card" as any]: palette[7].hex,
      ["--c-button-text" as any]: palette[7].hex,
      ["--c-dropdown-hover-text" as any]: palette[7].hex,
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

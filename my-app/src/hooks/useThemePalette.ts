import { useCallback, useMemo, useState } from "react";

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

export const useThemePalette = (initial: PaletteItem[] = DEFAULT_COLORS.map((c) => ({ ...c }))) => {
  const [palette, setPalette] = useState<PaletteItem[]>(() => initial.map((c) => ({ ...c })));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hexColor, setHexColor] = useState("#FFFFFF");

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

  const copyHex = useCallback(async () => {
    await navigator.clipboard.writeText(hexColor);
  }, [hexColor]);

  return {
    palette,
    activeIndex,
    hexColor,
    cssVars,
    selectBlock,
    setCurrentHex,
    reset,
    copyHex,
    setPalette,
  };
};

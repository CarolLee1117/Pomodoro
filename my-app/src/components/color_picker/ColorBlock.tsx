import styles from "./ColorBlock.module.css";
import type { MouseEvent } from "react";

interface ColorBlockProps {
    color: string;
    index: number;
    activeIndex: number | null;
    onSelect: (index: number, hex: string) => void;
    onDeselect?: () => void;
}

export default function ColorBlock({
    color,
    index,
    activeIndex,
    onSelect, 
}: ColorBlockProps) {
    const isActive = activeIndex === index;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (isActive)  return;
        onSelect(index, color);     // ← 直接把 hex 帶回父層
    };

    return (
    <div
        className={`${styles.block} ${isActive ? styles.active : ""}`}
        style={{ background: color }}
        onClick={handleClick}
    />
   );
}

import styles from "./ColorBlock.module.css";
import type { MouseEvent } from "react";

interface ColorBlockProps {
    color: string;
    index: number;
    activeIndex: number | null;
    setActiveIndex: (index: number | null) => void;
}

export default function ColorBlock({
    color,
    index,
    activeIndex,
    setActiveIndex,
}: ColorBlockProps) {
    const isActive = activeIndex === index;

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isActive) {
        // 取消選取：先加 returning 動畫，再還原
        e.currentTarget.classList.add(styles.returning);
        setTimeout(() => {
            e.currentTarget.classList.remove(styles.returning);
        }, 250);
        setActiveIndex(null);
    } else {
        setActiveIndex(index);
    }
    };

    return (
    <div
        className={`${styles.block} ${isActive ? styles.active : ""}`}
        style={{ background: color }}
        onClick={handleClick}
    />
   );
}

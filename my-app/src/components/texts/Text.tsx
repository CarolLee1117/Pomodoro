import type { CSSProperties, ReactNode } from "react";
import styles from "./Text.module.css";

interface textProps {
    text: ReactNode;
    color?: string;
    textAlign?: CSSProperties["textAlign"];
    fontSize?: CSSProperties["fontSize"];
}

function Text({
    text,
    color,
    textAlign,
    fontSize
}: textProps) { 
    return (
        <p 
            className={styles.text} 
            style={{
                color: color ?? "#788257",
                textAlign: textAlign ?? "center",
                fontSize: fontSize ?? "24px"
            }}
        >
            {text}
        </p>
    );
}

export default Text;
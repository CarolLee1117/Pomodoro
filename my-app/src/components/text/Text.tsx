import type { ReactNode } from "react";
import styles from "./Text.module.css";

interface textProps {
    text: ReactNode;
    textClass?: string;
}

function Text({
    text,
    textClass=""
}: textProps) { 
    return (
        <p className={`${styles.text} ${textClass}`} >
            {text}
        </p>
    );
}

export default Text;
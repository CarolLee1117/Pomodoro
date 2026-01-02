import { Link } from "react-router-dom";
import styles from "./IconButton.module.css";
import type { Icon } from "../../icons/icons/BaseIcon";

type Props = {
    icon: Icon;
    text: string;
    to?: string;
    onClick?: () => void;
    buttonClass?: string;
    textClass?: string;
    iconClass?: string;
    iconSize?: number;
};

export default function IconButton({
    icon: Icon,
    text,
    to,
    onClick,
    buttonClass = "",
    textClass = "",
    iconClass = "",
    iconSize = 32,
}: Props) {
    const content = (
        <>
            <div className={`${styles.iconContainer} ${iconClass}`}
                style={{ width: iconSize, height: iconSize }}>
                <Icon />
            </div>
            <p className={`${styles.text} ${textClass}`}>{text}</p>
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`${styles.button} ${buttonClass}`}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            className={`${styles.button} ${buttonClass}`}
            onClick={onClick}
        >
            {content}
        </button>
    );
}

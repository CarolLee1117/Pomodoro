import type { Icon } from "../../icons/icons/BaseIcon";
import styles from "./SquareIconButton.module.css";

type Props = {
    icon: Icon;
    onClick?: () => void;
    disabled?: boolean;
    size?: number;
    padding?: number;
    buttonClass?: string;
};

export default function SquareIconButton({
    icon: Icon,
    onClick,
    disabled = false,
    size = 45,
    padding = 16,
    buttonClass = "",
}: Props) {
    const buttonSize = size + padding * 2;

    return (
        <button
            type="button"
            className={`${styles.button} ${buttonClass}`}
            style={{ ["--size" as any]: `${size}px` }}
            onClick={onClick}
            disabled={disabled}
            aria-label="icon button"
        >
            <span className={styles.icon} style={{ width: size, height: size }}>
                <Icon />
            </span>
        </button>
    );
}

import styles from "./TextButton.module.css";

interface textButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    buttonClass?: string;
    textClass?: string;
    onClick?: () => void;
    disabled?: boolean;
}

function TextButton ({
    text,
    buttonClass="",
    textClass="",
    type,
    onClick,
    disabled=false,
}: textButtonProps) {
    return (
        <button
            type={type ?? "button"}
            className={`${styles.button} ${buttonClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            <p className={`${styles.label} ${textClass}`}>{text}</p>
        </button>
    );
}

export default TextButton;
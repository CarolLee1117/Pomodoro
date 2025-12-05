import styles from "./TextButton.module.css";

interface textButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    buttonClass?: string;
    textClass?: string;
    onClick?: () => void;
}

function TextButton ({
    text,
    buttonClass="",
    textClass="",
    type,
    onClick
}: textButtonProps) {
    return (
        <button
            type={type ?? "button"}
            className={`${styles.button} ${buttonClass}`}
            onClick={onClick}
        >
            <p className={`${styles.label} ${textClass}`}>{text}</p>
        </button>
    );
}

export default TextButton;
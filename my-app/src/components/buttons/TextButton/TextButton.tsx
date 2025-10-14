import styles from "./TextButton.module.css";

interface textButtonProps {
    text: string;
    buttonClass?: string;
    textClass?: string;
    onClick?: () => void;
}

function TextButton ({
    text,
    buttonClass="",
    textClass="",
    onClick
}: textButtonProps) {
    return (
        <button 
            className={`${styles.button} ${buttonClass}`}
            onClick={onClick}
        >
            <p className={`${styles.label} ${textClass}`}>{text}</p>
        </button>
    );
}

export default TextButton;
import styles from "./LoginForm.module.css";
import TextButton from "../buttons/TextButton/TextButton";
import Text from "../texts/Text";
import type { FormEvent } from "react";

interface LoginProps {
    name: string;
    pwd: string;
    message?: string;
    onChange: (key: "name" | "pwd", value: string) => void;
    onLogin: () => void;
    disabled?: boolean;
}

function LoginForm({
    name,
    pwd,
    message,
    onChange,
    onLogin,
    disabled = false,
}: LoginProps) {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (disabled) return;
        onLogin();
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.column}>
                <Text
                    text="Login"
                    textClass={styles.topic}
                />

                <div className={styles.flexStart}>
                    <Text 
                        text="Account" 
                        textClass={styles.text}
                    />
                    <input
                        className={styles.input}
                        value={name}
                        disabled={disabled}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                    <Text 
                        text="Password" 
                        textClass={styles.text}
                    />
                    <input
                        className={styles.input}
                        type="password"
                        value={pwd}
                        disabled={disabled}
                        onChange={(e) => onChange("pwd", e.target.value)}
                    />
                </div>

                {message && (
                    <Text
                        text={message}
                        textClass={styles.text}
                    />
                )}

                <TextButton
                    text={disabled ? "Loading in..." : "Okay !"}
                    textClass={styles.buttonText}
                    buttonClass={styles.button}
                    type="submit"
                    disabled={disabled}
                />
            </div>
        </form>
    );
}

export default LoginForm;

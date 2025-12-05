import styles from "./Login.module.css";
import TextButton from "../buttons/TextButton/TextButton";
import Text from "../texts/Text";
import type { FormEvent } from "react";

interface LoginProps {
    name: string;
    pwd: string;
    message?: string;
    onchange: (key: string, value: string) => void;
    onLogin: () => void;
}

function Login({
    name,
    pwd,
    message,
    onchange,
    onLogin,
}: LoginProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        onChange={(e) => onchange("name", e.target.value)}
                    />
                    <Text 
                        text="Password" 
                        textClass={styles.text}
                    />
                    <input
                        className={styles.input}
                        type="password"
                        value={pwd}
                        onChange={(e) => onchange("pwd", e.target.value)}
                    />
                </div>

                {message && (
                    <Text
                        text={message}
                        textClass={styles.text}
                    />
                )}

                <TextButton
                    text="Okay !"
                    textClass={styles.buttonText}
                    buttonClass={styles.button}
                    type="submit"
                />
            </div>
        </form>
    );
}

export default Login;

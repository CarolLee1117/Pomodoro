import styles from "./Login.module.css"
import TextButton from "../buttons/TextButton/TextButton";
import Text from "../texts/Text";

interface loginProps {
    name: string;
    pwd: string;
    onchange: (key: string, value: string) => void;
    onLogin: () => void;
}

function Login({
    name,
    pwd,
    onchange,
    onLogin,
}: loginProps) {
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <Text
                    text="Login"
                    textClass={styles.topic}
                />
                <input 
                    className={styles.input}
                    value={name}
                    onChange={(e) => onchange("name", e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    value={pwd}
                    onChange={(e) => onchange("pwd", e.target.value)}
                />
                <TextButton 
                    text="Okay !" 
                    textClass={styles.buttonText}
                    buttonClass={styles.button}
                    onClick={onLogin}
                />

            </div>
        </div>
    );
}

export default Login;
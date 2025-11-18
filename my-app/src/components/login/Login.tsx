import styles from "./Login.module.css"
import TextButton from "../buttons/TextButton/TextButton";
import Text from "../texts/Text";

interface loginProps {
    name: string;
    pwd: string;
    onchange: (key: string, value: string) => void;
}

function Login({
    name,
    pwd,
    onchange
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
                    text="Log in" 
                    textClass={styles.buttonText}
                    buttonClass={styles.button}
                />
            </div>
        </div>
    );
}

export default Login;
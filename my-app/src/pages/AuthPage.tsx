import { useCallback, useState, type ReactElement } from "react";
import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import desk from "../images/desk.jpg";
import Text from "../components/texts/Text";
import styles from "./AuthPage.module.css";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import LoginForm from "../components/auth/LoginForm";


function AuthPage(): ReactElement {
    const [form, setForm] = useState({
        name: "",
        pwd: "",
    });
    const [loaded, setLoaded] = useState(false);

    const { message, isLoading, submitLogin } = useLogin();

    const handleChange = useCallback((key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleLogin = useCallback(() => {
        submitLogin(form.name, form.pwd);
    }, [submitLogin, form.name, form.pwd]);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            <div
                className={styles.container}
                style={{
                    backgroundImage: `url(${desk})`,
                }}
            >
                <div className={styles.left}>
                    <Text
                        text="It's a good day to focus."
                        textClass={styles.topic}
                    />
                </div>
                <div className={styles.right}>
                    <LoginForm
                        name={form.name}
                        pwd={form.pwd}
                        message={message}
                        onchange={handleChange}
                        onLogin={handleLogin}
                    />
                </div>
            </div>
            <CoveredFadeIn isLoaded={loaded} />
        </>
    );
}

export default AuthPage;
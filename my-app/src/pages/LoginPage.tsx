import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useEffect } from "react";
import Login from "../components/login/Login";
import desk from "../images/desk.jpg";
import Text from "../components/texts/Text";
import styles from "./LoginPage.module.css";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";


function LoginPage(): ReactElement {
    const [form, setForm] = useState({
        name: "",
        pwd: "",
    });
    const [loaded, setLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
            setLoaded(true);
        }, []);

    const handleLogin = async () => {
        try {
            setMessage("");
            const result = await login(form.name, form.pwd);
            // Login Success
            // alert(result.message);
            navigate("/")
            setMessage(result.message);
        } catch (err: any) {
            setMessage(err.response.data.message || "Login failed");
        }
    };

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
                    <Login
                        name={form.name}
                        pwd={form.pwd}
                        message={message}
                        onchange={handleChange}
                        onLogin={handleLogin}
                    />
                </div>
            </div>
            
            {/*RWD test*/}
            <CoveredFadeIn isLoaded={loaded} />
        </>
    );
}

export default LoginPage;
{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10">  
    <button
        className="border p-5 rounded bg-white"
        onClick={handleHello}
    >
        hello
    </button>
</div> */}
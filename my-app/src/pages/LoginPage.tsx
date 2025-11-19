import { useState, type ReactElement } from "react";
import Login from "../components/login/Login";
// import styles from "./LoginPage.module.css"
import { hello, login } from "../services/auth";
import { useNavigate } from "react-router-dom";

function LoginPage(): ReactElement {
    const [form, setForm] = useState({
        name: "",
        pwd: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleLogin = async () => {
        try {
            setMessage("");
            const result = await login(form.name, form.pwd);
            // Login Success
            alert(result.message);
            navigate("/")
            setMessage(result.message);
        } catch (err: any) {
            setMessage(err.response.data.message || "Login failed");
        }
    };

    const handleHello = async () => {
        const result = await hello();
        alert(result.data.message);
    }

    return (
        <>
            <Login
                name={form.name}
                pwd={form.pwd}
                onchange={handleChange}
                onLogin={handleLogin}
            />
            <p>{message}</p>
            
            {/*RWD test*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">  
                <button
                    className="border p-5 rounded bg-white"
                    onClick={handleHello}
                >
                    hello
                </button>
            </div>
        </>
    );
}

export default LoginPage;
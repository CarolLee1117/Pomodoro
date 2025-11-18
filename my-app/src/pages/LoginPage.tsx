import Login from "../components/login/Login";
import styles from "./LoginPage.module.css"
import { useState } from "react";


function LoginPage () {
    const [form, setForm] = useState({
        name: "",
        pwd: "",
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return(
        <Login
            name={form.name}
            pwd={form.pwd}
            onchange={handleChange}
        />
    );
}

export default LoginPage;
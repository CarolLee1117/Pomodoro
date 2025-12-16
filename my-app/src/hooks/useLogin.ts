import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/auth";

export const useLogin = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = useCallback(
        async (name: string, pwd: string) => {
            try {
                setIsLoading(true);
                setMessage("");

                const result = await login(name, pwd);

                navigate("/");

                setMessage(result.message ?? "Login success");
            } catch (err: any) {
                setMessage(err?.response?.data?.message || "Login failed");
            } finally {
                setIsLoading(false);
            }
        },
        [navigate]
    );

    return {
        message,
        isLoading,
        submitLogin,
        clearMessage: () => setMessage(""),
        setMessage,
    };
};
import React, { useEffect, createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";

type TransitionApi = {
    go: (to: string) => void;
    run: (fn: () => void) => void;
    fadeOut: () => void;
};

const TransitionContext = createContext<TransitionApi | null>(null);

export const useTransition = () => {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
    return ctx;
};

export default function TransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { loaded, fadeOut, fadeIn } = useFadeIn();

    useEffect(() => {
        fadeIn();
    }, [location.pathname]);

    const go = (to: string) => {
        fadeOut();
        setTimeout(() => navigate(to), 1000);
    };

    const run = (fn: () => void) => {
        fadeOut();
        setTimeout(() => {
            fn();
            fadeIn();
        }, 1000);
    };

    useEffect(() => {
        const raw = localStorage.getItem("theme:vars");
        if (!raw) return;

        try {
            const vars = JSON.parse(raw) as Record<string, string>;
            Object.entries(vars).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
            });
        } catch {

        }    
    }, []);

    const value = useMemo(() => ({ go, run, fadeOut }), []);

    return (
        <TransitionContext.Provider value={value}>
            {children}
            <CoveredFadeIn isLoaded={loaded} />
        </TransitionContext.Provider>
    );
}


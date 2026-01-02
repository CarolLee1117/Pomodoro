import React, { useEffect, createContext, useContext, useCallback, useRef } from "react";
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

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { loaded, fadeOut, fadeIn } = useFadeIn();

    const lockRef = useRef(false);

    useEffect(() => {
        fadeIn();
    }, [location.pathname, fadeIn]);

    const go = useCallback(
        (to: string) => {
        if (lockRef.current) return;
        lockRef.current = true;

        fadeOut();
        window.setTimeout(() => {
            if (to !== location.pathname) {
            navigate(to);
            }

            requestAnimationFrame(() => {
            fadeIn();
            lockRef.current = false;
            });
        }, 1000);
        },
        [fadeOut, fadeIn, navigate, location.pathname]
    );

    const run = useCallback(
        (fn: () => void) => {
        if (lockRef.current) return;
        lockRef.current = true;

        fadeOut();
        window.setTimeout(() => {
            fn();
            requestAnimationFrame(() => {
            fadeIn();
            lockRef.current = false;
            });
        }, 1000);
        },
        [fadeOut, fadeIn]
    );

    // Theme init
    useEffect(() => {
        const raw = localStorage.getItem("theme:vars");
        if (!raw) return;
        try {
        const vars = JSON.parse(raw) as Record<string, string>;
        Object.entries(vars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
        } catch {}
    }, []);

    return (
        <TransitionContext.Provider value={{ go, run, fadeOut }}>
        {children}
        <CoveredFadeIn isLoaded={loaded} />
        </TransitionContext.Provider>
    );
}

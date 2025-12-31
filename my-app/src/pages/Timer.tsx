import { useState, useEffect } from "react";

type Mode = "idle" | "focus" | "break";

const Timer = () => {
    const focusMinutes = 0.1;
    const breakMinutes = 0.1;

    const [mode, setMode] = useState<Mode>("idle");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleStart = () => {
        setMode("focus");
        setSecondsLeft(focusMinutes * 60);
    };

    const handleReset = () => {
        setMode("idle");
        setSecondsLeft(0);
    };

    useEffect(() => {
        if (mode === "idle") return;
        if (isPaused) return;
        if (secondsLeft <= 0) return;

        const t = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(t);
    }, [mode, secondsLeft, isPaused]);

    useEffect(() => {
        if (secondsLeft > 0) return;

        if (mode === "focus") {
            setMode("break");
            setSecondsLeft(breakMinutes * 60);
        } else if (mode === "break") {
            setMode("idle");
            setSecondsLeft(0);
        }
    }, [secondsLeft, mode]);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");

    return (
        <div style={{ padding: 24 }}>
            <h1>Timer</h1>
            <p>Mode: {mode}</p>
            <h2>{mm}:{ss}</h2>

            <button onClick={handleStart} disabled={mode !== "idle"}>
                Start
            </button>

            <button 
                onClick={() => setIsPaused((p) => !p)}
                disabled={mode === "idle"}
                style={{ marginLeft: 8 }}
            >
                {isPaused ? "Resume" : "Pause"}
            </button>

            <button
                onClick={handleReset}
                style={{ marginLeft: 8 }}
            >
                Reset
            </button>
        </div>
    );
};

export default Timer;
import { useEffect, useState } from "react";
import styles from "./TimerRunning.module.css";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/texts/Text";


type Mode = "focus" | "break";

type Props = {
    focusMinutes: number;
    breakMinutes: number;
    cycles: number;
    onReset: () => void;
    onAbort: () => void;
};

export default function TimerRunning({
    focusMinutes,
    breakMinutes,
    cycles,
    onReset,
    onAbort,

}: Props) {
    const [mode, setMode] = useState<Mode>("focus");
    const [isPaused, setIsPaused] = useState(false);
    const [currentCycle, setCurrentCycle] = useState(1);
    const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");

    useEffect(() => {
        if (isPaused) return;
        if (secondsLeft <= 0) return;

        const t = window.setTimeout(() => {
            setSecondsLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => window.clearTimeout(t);
    }, [isPaused, secondsLeft]);

    useEffect(() => {
        if (secondsLeft > 0) return;

        if (mode === "focus") {
            setMode("break");
            setSecondsLeft(breakMinutes * 60);
            return;
        }

        if (currentCycle >= cycles) {
            onAbort();
            return;
        }

        setCurrentCycle((c) => c + 1);
        setMode("focus");
        setSecondsLeft(focusMinutes * 60);
    }, [
        secondsLeft,
        mode,
        currentCycle,
        cycles,
        breakMinutes,
        focusMinutes,
        onAbort,
    ]);

    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.column}>
            <Text
                text={`${currentCycle} / ${cycles}`}
                textClass={styles.cycleText}
            />
            <Text
                text={mode === "focus" ? "Focus" : "Break"}
                textClass={styles.stateText}
            />
            <Text text={`${mm}:${ss}`} textClass={styles.leftTimeText} />
            <Text text="50% completed" textClass={styles.completedText} />
            </div>

            <div className={styles.footerRow}>
            <TextButton
                text={isPaused ? "Resume" : "Pause"}
                onClick={() => setIsPaused((p) => !p)}
            />
            <TextButton text="Reset" onClick={onReset} />
            <TextButton text="Abort" onClick={onAbort} />
            </div>
        </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import styles from "./TimerRunning.module.css";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/text/Text";


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

    const totalSeconds = mode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
    const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 1;
    const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));


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
            <div className={styles.card}>
                <Text text={`Cycle ${currentCycle}/${cycles}`} textClass={styles.cycleText} />

                <div className={styles.pill}>
                <Text text={mode === "focus" ? "Focus" : "Break"} textClass={styles.pillText} />
                </div>

                <Text text={`${mm} : ${ss}`} textClass={styles.timeText} />

                <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${pct}%` }} />
                </div>

                <Text text={`${pct}% completed`} textClass={styles.completedText} />
            </div>

            <div className={styles.buttonsRow}>
                <TextButton
                text={isPaused ? "Resume" : "Pause"}
                buttonClass={styles.pauseBtn}
                textClass={styles.btnText1}
                onClick={() => setIsPaused((p) => !p)}
                />
                <TextButton
                text="Reset"
                buttonClass={styles.resetBtn}
                textClass={styles.btnText2}
                onClick={onReset}
                />
                <TextButton
                text="Abort"
                buttonClass={styles.abortBtn}
                textClass={styles.btnText3}
                onClick={onAbort}
                />
            </div>
        </div>

    );
}

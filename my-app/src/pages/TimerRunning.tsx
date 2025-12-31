import { useEffect, useState } from "react";

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


    useEffect(() => {
        if (isPaused) return;

        const t = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(t);
    }, [isPaused]);

    useEffect(() => {
        if (secondsLeft > 0) return;

        if (mode === "focus") {
        setMode("break");
        setSecondsLeft(breakMinutes * 60);
        } else {
        if (currentCycle >= cycles) {
            onAbort();
            return;
        }
        setCurrentCycle((c) => c + 1);
        setMode("focus");
        setSecondsLeft(focusMinutes * 60);
        }
    }, [secondsLeft, mode, currentCycle, cycles, breakMinutes, focusMinutes, onAbort]);

  return (
        <div style={{ padding: 24 }}>
        <h2>Timer Running</h2>

        <div>Cycle: {currentCycle} / {cycles}</div>
        <div>Mode: {mode}</div>
        <div>Seconds Left: {secondsLeft}</div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => setIsPaused((p) => !p)}>
            {isPaused ? "Resume" : "Pause"}
            </button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onAbort}>Abort</button>
        </div>
        </div>
    );
}

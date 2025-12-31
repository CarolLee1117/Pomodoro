type Props = {
    focusMinutes: number;
    breakMinutes: number;
    cycles: number;
    setFocusMinutes: (v: number) => void;
    setBreakMinutes: (v: number) => void;
    setCycles: (v: number) => void;
    onStart: () => void;
    onBack: () => void;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function TimerSetup({
    focusMinutes,
    breakMinutes,
    cycles,
    setFocusMinutes,
    setBreakMinutes,
    setCycles,
    onStart,
    onBack,
    }: Props) {
    return (
        <div style={{ padding: 24 }}>
        <h2>Timer Setup</h2>

        <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
            <label>
            Focus (min):
            <input
                type="number"
                value={focusMinutes}
                onChange={(e) =>
                setFocusMinutes(clamp(Number(e.target.value), 1, 180))
                }
            />
            </label>

            <label>
            Break (min):
            <input
                type="number"
                value={breakMinutes}
                onChange={(e) =>
                setBreakMinutes(clamp(Number(e.target.value), 1, 60))
                }
            />
            </label>

            <label>
            Cycles:
            <input
                type="number"
                value={cycles}
                onChange={(e) =>
                setCycles(clamp(Number(e.target.value), 1, 12))
                }
            />
            </label>

            <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onBack}>Back</button>
            <button onClick={onStart}>Start</button>
            </div>
        </div>
        </div>
    );
}

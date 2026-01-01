import { useState } from "react";

import TimerSetup from "./TimerSetup";
import TimerRunning from "./TimerRunning";

import { useTransition } from "../providers/TransitionProvider";

export default function Timer() {
    const { run, go } = useTransition();

    const [isRunning, setIsRunning] = useState(false);
    const [focusMinutes, setFocusMinutes] = useState(30);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [cycles, setCycles] = useState(4);

    return (
        <>
            {!isRunning ? (
                <TimerSetup
                    focusMinutes={focusMinutes}
                    breakMinutes={breakMinutes}
                    cycles={cycles}
                    setFocusMinutes={setFocusMinutes}
                    setBreakMinutes={setBreakMinutes}
                    setCycles={setCycles}
                    onStart={() => run(() => setIsRunning(true))}
                    onBack={() => go("/")}
                />
            ) : (
                <TimerRunning
                    focusMinutes={focusMinutes}
                    breakMinutes={breakMinutes}
                    cycles={cycles}
                    onReset={() => run(() => setIsRunning(false))}
                    onAbort={() => go("/")}
                />
            )}
        </>
    );
}

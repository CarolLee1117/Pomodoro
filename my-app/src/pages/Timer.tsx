import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimerSetup from "./TimerSetup";
import TimerRunning from "./TimerRunning";

export default function Timer() {
  const navigate = useNavigate();

  const [focusMinutes, setFocusMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [cycles, setCycles] = useState(4);

  const [isRunning, setIsRunning] = useState(false);

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
          onStart={() => setIsRunning(true)}
          onBack={() => navigate("/")}
        />
      ) : (
        <TimerRunning
          focusMinutes={focusMinutes}
          breakMinutes={breakMinutes}
          cycles={cycles}
          onReset={() => setIsRunning(false)}
          onAbort={() => {
            setIsRunning(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
}

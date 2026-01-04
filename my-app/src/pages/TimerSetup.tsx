import styles from "./TimerSetup.module.css";
import MenuDropDown from "../components/drop_down/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import SquareIconButton from "../components/buttons/SquareIconButton/SquareIconButton";
import HomeIcon from "../components/icons/icons/HomeIcon";
import MinusIcon from "../components/icons/icons/MinusIcon";
import PlusIcon from "../components/icons/icons/PlusIcon";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/text/Text";
import { useState } from "react";
import { useTransition } from "../providers/TransitionProvider";


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

type FieldKey = "focus" | "break" | "cycles";

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
    const { go } = useTransition();
    const [activeField, setActiveField] = useState<FieldKey>("focus");

    const FIELD = {
        focus: {
            label: "Focus Time",
            min: 1,
            max: 180,
            step: 1,
            unit: "Minutes",
            value: focusMinutes,
            setValue: setFocusMinutes,
        },
        break: {
            label: "Break Time",
            min: 1,
            max: 60,
            step: 1,
            unit: "Minutes",
            value: breakMinutes,
            setValue: setBreakMinutes,
        },
        cycles: {
            label: "Cycle Count",
            min: 1,
            max: 12,
            step: 1,
            unit: "Cycles",
            value: cycles,
            setValue: setCycles,
        },
    } as const;

    const current = FIELD[activeField];

    const changeBy = (delta: number) => {
        current.setValue(clamp(current.value + delta, current.min, current.max));
    };

    const onInputChange = (raw: string) => {
        if (raw === "") return;
        const n = Number(raw);
        if (Number.isNaN(n)) return;
        current.setValue(clamp(n, current.min, current.max));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown />
                <FunctionalIcon icon={HomeIcon} onClick={() => go("/")} />
            </div>

            <div className={styles.content}>
                <div className={styles.column}>
                    <Text text="Timer Setup" textClass={styles.topicText} />

                    <div className={styles.row}>
                        <TextButton
                            text="Focus Time"
                            buttonClass={`${styles.fieldTab} ${activeField === "focus" ? styles.fieldTabActive : ""}`}
                            textClass={
                                activeField === "focus" ? styles.activeField : styles.inactiveField
                            }
                            onClick={() => setActiveField("focus")}
                        />
                        <TextButton
                            text="Break Time"
                            buttonClass={`${styles.fieldTab} ${activeField === "break" ? styles.fieldTabActive : ""}`}
                            textClass={
                                activeField === "break" ? styles.activeField : styles.inactiveField
                            }
                            onClick={() => setActiveField("break")}
                        />
                        <TextButton
                            text="Cycle Count"
                            buttonClass={`${styles.fieldTab} ${activeField === "cycles" ? styles.fieldTabActive : ""}`}
                            textClass={
                                activeField === "cycles" ? styles.activeField : styles.inactiveField
                            }
                            onClick={() => setActiveField("cycles")}
                        />
                    </div>

                    <div className={styles.row}>
                        <SquareIconButton
                            icon={MinusIcon}
                            size={80}
                            padding={5}
                            buttonClass={styles.controlBtn}
                            onClick={() => changeBy(-current.step)}
                        />

                        <div className={styles.valueBox}>
                            <input
                                className={styles.numberInput}
                                type="number"
                                value={current.value}
                                onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                        <SquareIconButton
                            icon={PlusIcon}
                            size={80}
                            padding={5}
                            buttonClass={styles.controlBtn}
                            onClick={() => changeBy(+current.step)}
                        />
                    </div>
                    <Text text={current.unit} textClass={styles.unitText} />
                </div>

                <div className={styles.footerRow}>
                    <TextButton text="Back" buttonClass={styles.backBtn} textClass={styles.backText} onClick={onBack} />
                    <TextButton text="Start" buttonClass={styles.startBtn} onClick={onStart} />
                </div>
            </div>
        </div>
    );
}

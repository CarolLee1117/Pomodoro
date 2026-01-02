import styles from "./Theme.module.css";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/texts/Text";
import Sample from "../components/sample/Sample";
import WheelSet from "../components/color_picker/WheelSet";
import ColorBlock from "../components/color_picker/ColorBlock";

import { THEME_TOKEN_KEYS } from "../hooks/useThemePalette";
import { useThemePalette } from "../hooks/useThemePalette";
import { useTransition } from "../providers/TransitionProvider";

function Theme() {

    const { go } = useTransition();

    const {
        palette,
        activeIndex,
        hexColor,
        cssVars,
        selectBlock,
        setCurrentHex,
        reset,
        copyHex,
    } = useThemePalette();

    const usageText =
        activeIndex !== null ? palette[activeIndex].usage : "Click a color block to view its usage.";

    const handleSave = () => {
        const vars: Record<string, string> = {};
        Object.entries(cssVars).forEach(([k, v]) => {
            if (typeof v === "string") vars[k] = v;
        });

        localStorage.setItem("theme:vars", JSON.stringify(vars));
        Object.entries(vars).forEach(([k, v]) => {
            document.documentElement.style.setProperty(k, v);
        });
    };

    const handleReset = () => {
        localStorage.removeItem("theme:vars");
        THEME_TOKEN_KEYS.forEach((k) => {
            document.documentElement.style.removeProperty(k);
        });
        reset();
    };

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <MenuDropDown/>
            <FunctionalIcon icon={HomeIcon} onClick={() => go("/")} />
        </div>

        <div className={styles.content}>
            <div className={styles.row}>
            <div className={styles.leftColumn}>
                <Text text="COLOR PICKER" textClass={styles.topicText} />

                <WheelSet
                value={hexColor}
                onChange={setCurrentHex}
                wheelClass={styles.wheel}
                sliderClass={styles.slider}
                />

                <div className={styles.copyRow}>
                <Text text={hexColor} textClass={styles.hexText} />
                <TextButton
                    text="copy"
                    buttonClass={styles.copyBtn}
                    textClass={styles.copyBtnText}
                    onClick={async () => {
                    try {
                        await copyHex();
                        alert("Copied!");
                    } catch {
                        alert("Copy failed.");
                    }
                    }}
                />
                </div>
            </div>

            <div className={styles.rightColumn}>
                <div className={styles.blocksRow}>
                {palette.map((c, i) => (
                    <ColorBlock
                    key={c.key}
                    color={c.hex}
                    index={i}
                    activeIndex={activeIndex}
                    onSelect={selectBlock}
                    />
                ))}
                </div>

                <Text
                text={usageText}
                textClass={activeIndex !== null ? styles.usageText : styles.promptText}
                />

                <div className={styles.sampleScope} style={cssVars}>
                    <Sample />
                </div>
            </div>
            </div>

            <div className={styles.bottomBtnRow}>
            <TextButton
                text="Reset"
                buttonClass={styles.resetBtn}
                textClass={styles.mainBtnText}
                onClick={handleReset}
            />
            <TextButton
                text="Save"
                buttonClass={styles.saveBtn}
                textClass={styles.mainBtnText}
                onClick={handleSave}
            />
            </div>
        </div>
        </div>
    );
}

export default Theme;

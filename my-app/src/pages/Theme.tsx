import styles from "./Theme.module.css";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/texts/Text";
import Sample from "../components/sample/Sample";
import WheelSet from "../components/color_picker/WheelSet";
import ColorBlock from "../components/color_picker/ColorBlock";

import { useFadeIn } from "../hooks/useFadeIn";
import { useThemePalette } from "../hooks/useThemePalette";

function Theme() {
    const { loaded, fadeOut, fadeIn } = useFadeIn();

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
        console.log("save palette", palette);
        alert("Saved (console)");
    };

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <MenuDropDown
            onNavigate={fadeOut}
            afterNavigate={fadeIn}
            />
            <FunctionalIcon icon={HomeIcon} to="/" />
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
                onClick={reset}
            />
            <TextButton
                text="Save"
                buttonClass={styles.saveBtn}
                textClass={styles.mainBtnText}
                onClick={handleSave}
            />
            </div>
        </div>

        <CoveredFadeIn isLoaded={loaded} />
        </div>
    );
}

export default Theme;

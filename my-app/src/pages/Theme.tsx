import styles from "./Theme.module.css";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/texts/Text";
import Sample from "../components/sample/Sample";
import { useEffect, useState } from "react";
import WheelSet from "../components/color_picker/WheelSet";
import ColorBlock from "../components/color_picker/ColorBlock";


const DEFAULT_COLORS = [
    { hex: "#788257", usage: "icon / main text / dropdown text", key: "block_1" },
    { hex: "#BBD26E", usage: "button / dropdown hover background", key: "block_2" },
    { hex: "#57825B", usage: "button hover text / secondary text", key: "block_3" },
    { hex: "#A8CD98", usage: "button hover background", key: "block_4" },
    { hex: "#CEE5A3", usage: "drop down card", key: "block_5" },
    { hex: "#DAF1C4", usage: "background", key: "block_6" },
    { hex: "#E9F3C8", usage: "prompt", key: "block_7" },
    { hex: "#F6FFD8", usage: "card / button text / dropdown hover text", key: "block_8" },
];


function Theme(){
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(0);
    const [palette, setPalette] = useState(DEFAULT_COLORS);
    const [hexColor, setHexColor] = useState("#FFFFFF");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const selectBlock = (i: number | null) => {
    setActiveIndex(i);
    if (i !== null){
        setHexColor(palette[i].hex.toUpperCase());  // 讓左邊 picker 同步顯示
    }
    };

    const applyColor = (i: number, hex: string) =>
    setPalette(p => p.map((c, idx) => (idx === i ? { ...c, hex } : c)));

    // 當使用者拖動 color picker，更新目前選到的色塊
    useEffect(() => {
        if (activeIndex !== null) applyColor(activeIndex, hexColor.toUpperCase());
    }, [hexColor, activeIndex]);

    // 提供給範例區/整頁使用的 CSS 變數（關鍵！）
    const cssVars: React.CSSProperties = {
        // block_1
        ["--c-icon" as any]: palette[0].hex,
        ["--c-main-text" as any]: palette[0].hex,
        ["--c-dropdown-text" as any]: palette[0].hex,

        // block_2
        ["--c-button" as any]: palette[1].hex,
        ["--c-dropdown-hover-bg" as any]: palette[1].hex,

        // block_3
        ["--c-button-hover-text" as any]: palette[2].hex,
        ["--c-secondary-text" as any]: palette[2].hex,

        // block_4
        ["--c-button-hover-bg" as any]: palette[3].hex,

        // block_5
        ["--c-dropdown-card" as any]: palette[4].hex,

        // block_6
        ["--c-bg" as any]: palette[5].hex,

        // block_7
        ["--c-prompt" as any]: palette[6].hex,

        // block_8
        ["--c-card" as any]: palette[7].hex,
        ["--c-button-text" as any]: palette[7].hex,
        ["--c-dropdown-hover-text" as any]: palette[7].hex,
    };

    useEffect(() => {
        setLoaded(true);
    }, [reload]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown 
					onNavigate={() => {
						setLoaded(false); 
					}}
					afterNavigate={() => {
						setReload((prev) => prev + 1);
					}}
				/>
				<FunctionalIcon icon={HomeIcon} to="/" />
            </div>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.leftColumn}>
                        <Text 
                            text="COLOR PICKER"
                            textClass={styles.topicText}
                        />
                        <WheelSet 
                            value={hexColor} 
                            onChange={(code) => setHexColor(code.toUpperCase())} 
                            wheelClass={styles.wheel}
                            sliderClass={styles.slider}
                        />
                        <div className={styles.copyRow}>
                            <Text 
                                text={hexColor}
                                textClass={styles.hexText}
                            />
                            <TextButton
                                text="copy"
                                buttonClass={styles.copyBtn}
                                textClass={styles.copyBtnText}
                                onClick={() => {alert("copy")}}
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
                                    setActiveIndex={selectBlock}
                                 />
                             ))}
                        </div>
                        {activeIndex !== null ? (
                            <Text 
                                text={palette[activeIndex].usage} 
                                textClass={styles.usageText}
                            />
                        ) : (
                            <Text 
                                text="Click a color block to view its usage." 
                                textClass={styles.promptText}
                            />
                        )}
                        <div className={styles.sampleScope} style={cssVars}>
                            <Sample/>    
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBtnRow}>
                    <TextButton
                        text="Reset"
                        buttonClass={styles.resetBtn}
                        textClass={styles.mainBtnText}
                        onClick={() => {alert("reset")}}
                    />
                    <TextButton
                        text="Save"
                        buttonClass={styles.saveBtn}
                        textClass={styles.mainBtnText}
                        onClick={() => {alert("save")}}
                    />
                </div>
            </div>
            <CoveredFadeIn isLoaded={loaded} />
        </div>
    );
}


export default Theme;
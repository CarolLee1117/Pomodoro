import styles from "./Theme.module.css";
import MenuDropDown from "../components/drop_downs/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import CoveredFadeIn from "../components/animate/CoveredFadeIn/CoveredFadeIn";
import TextButton from "../components/buttons/TextButton/TextButton";
import Text from "../components/texts/Text";
import { useEffect, useState } from "react";
import WheelSet from "../components/color_picker/WheelSet";

function Theme(){
    const [loaded, setLoaded] = useState(false);
    const [reload, setReload] = useState(0);
    const [hexColor, setHexColor] = useState("#ffffff");

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
                    <div className={styles.column}>
                        <Text text="COLOR PICKER"/>
                        <WheelSet 
                            value={hexColor} 
                            onChange={setHexColor} 
                            wheelClass={styles.wheel}
                            sliderClass={styles.slider}
                            />
                        <div
                            style={{
                                width: '100%',
                                height: 34,
                                marginTop: 0,
                                background: hexColor,
                            }}
                        />
                    </div>
                    <div className={styles.column}>

                    </div>
                </div>
                <div className={styles.row}>
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
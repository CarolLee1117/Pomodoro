import styles from "./Sample.module.css"
import Text from "../text/Text";
import HomeIcon from "../icons/icons/HomeIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import ThemeIcon from "../icons/icons/ThemeIcon";
import InsightsIcon from "../icons/icons/InsightsIcon";
import IconButton from "../buttons/IconButton/IconButton";
import TextButton from "../buttons/TextButton/TextButton";


function Sample() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.prompt}>
                        <div className={styles.iconRow}>
                            <div className={styles.icon}><HomeIcon /></div>
                            <div className={styles.icon}><MenuIcon /></div>
                            <div className={styles.icon}><InsightsIcon /></div>
                            <div className={styles.icon}><ThemeIcon /></div>
                        </div>
                        <Text text="This is main text sample." textClass={styles.mainText} />
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.card}>
                        <IconButton
                            icon={HomeIcon}
                            text="Sample 1"
                            buttonClass={`${styles.dropdownBtn} ${styles.iconText}`}
                            textClass={styles.textLabel}
                            iconSize={30}
                        />
                        <IconButton
                            icon={MenuIcon}
                            text="Sample 2"
                            buttonClass={`${styles.dropdownBtn} ${styles.iconText}`}
                            textClass={styles.textLabel}
                            iconSize={30}
                        />
                    </div>
                    <div className={styles.btnRow}>
                        <TextButton
                            text="Button 1"
                            textClass={styles.buttonText1}
                            buttonClass={styles.button1}
                        />
                        <TextButton
                            text="Button 2"
                            textClass={styles.buttonText2}
                            buttonClass={styles.button2}
                        />
                        <TextButton
                            text="Button 3"
                            textClass={styles.buttonText3}
                            buttonClass={styles.button3}
                        />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Sample;
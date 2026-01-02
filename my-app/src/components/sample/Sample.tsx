import styles from "./Sample.module.css"
import Text from "../texts/Text";
import HomeIcon from "../icons/icons/HomeIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import ThemeIcon from "../icons/icons/ThemeIcon";
import InsightsIcon from "../icons/icons/InsightsIcon";
import IconButton from "../buttons/IconButton/IconButton";
import TextButton from "../buttons/TextButton/TextButton";


function Sample() {
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.prompt}>
                        <div className={styles.iconRow}>
                            <div className={styles.icon}><HomeIcon/></div>
                            <div className={styles.icon}><MenuIcon/></div>
                            <div className={styles.icon}><InsightsIcon/></div>
                            <div className={styles.icon}><ThemeIcon/></div>
                        </div>
                        <Text text="This is main text sample." textClass={styles.mainText}/>
                        <Text text="This is secondary text sample." textClass={styles.secondaryText}/>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.card}>
                        <IconButton
                            icon={HomeIcon}
                            text="Sample 1"
                            buttonClass={`${styles.dropdownBtn} ${styles.iconText}`}
                            textClass={styles.textLabel} 
                            size={30}
                        />
                        <IconButton
                            icon={MenuIcon}
                            text="Sample 2"
                            buttonClass={`${styles.dropdownBtn} ${styles.iconText}`}
                            textClass={styles.textLabel}
                            size={30}
                        />
                    </div>
                    <TextButton 
                        text="Button"
                        textClass={styles.buttonText}
                        buttonClass={styles.button}
                    />
                    
                </div>
            </div>
        </div>

    );
}

export default Sample;
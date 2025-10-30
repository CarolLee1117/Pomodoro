import styles from "./Sample.module.css"
import Text from "../texts/Text";
import HomeIcon from "../icons/icons/HomeIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import AccountIcon from "../icons/icons/AccountIcon";
import ThemeIcon from "../icons/icons/ThemeIcon";
import IconButton from "../buttons/IconButtton/IconButton";
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
                            <div className={styles.icon}><AccountIcon/></div>
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
                            size="30px"
                        />
                        <IconButton
                            icon={MenuIcon}
                            text="Sample 2"
                            buttonClass={`${styles.dropdownBtn} ${styles.iconText}`}
                            textClass={styles.textLabel}
                            size="30px"
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
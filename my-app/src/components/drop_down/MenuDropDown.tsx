import styles from "./MenuDropDown.module.css";
import FunctionalIcon from "../icons/FunctionalIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import IconButton from "../buttons/IconButton/IconButton";
import ThemeIcon from "../icons/icons/ThemeIcon";
import InsightsIcon from "../icons/icons/InsightsIcon";
import { useState } from "react";
import { useTransition } from "../../providers/TransitionProvider";


function MenuDropDown() {
    const { go } = useTransition();
    const [display, setDisplay] = useState(false);

    const handleNavigation = (to: string) => {
        setDisplay(false);
        go(to);
    };

    const Card = () => (
        <div className={styles.card}>
            <div>
                <IconButton 
                    icon={ThemeIcon} 
                    iconClass={styles.themeIcon}
                    iconSize={36}
                    onClick={() => handleNavigation("/theme")}
                    text="Theme"
                />
            </div>
            <div>
                <IconButton 
                    icon={InsightsIcon} 
                    iconClass={styles.insightsIcon}
                    iconSize={36}
                    onClick={() => handleNavigation("/insights")}
                    text="Insights"
                />
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <FunctionalIcon
                    icon={MenuIcon}
                    iconClass={styles.icon}
                    onClick={() => { setDisplay((curr) => !curr) }}
                />
            </div>
            <div className={styles.cardContainer}>
                {display && <Card />}
            </div>
        </div>

    )
}

export default MenuDropDown;
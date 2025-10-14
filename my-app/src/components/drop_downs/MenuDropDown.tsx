import styles from "./MenuDropDown.module.css";
import FunctionalIcon from "../icons/FunctionalIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import IconButton from "../buttons/IconButtton/IconButton";
import AccountIcon from "../icons/icons/AccountIcon";
import ThemeIcon from "../icons/icons/ThemeIcon";
import StatsIcon from "../icons/icons/StatsIcon";
import SignOutIcon from "../icons/icons/SignOutIcon";
import { useState } from "react";

function MenuDropDown() {
    const [display, setDisplay] = useState(false);
    // useState 是其中一種 hook，是使用 setDisplay 函式去更改 display 常數的作法，display 預設值為 false

    const Card = () => (
        <div className={styles.card}>
            <div>
                <IconButton 
                    icon={AccountIcon} 
                    text="Account"
                    to="/account"
                />
            </div>
            <div>
                <IconButton 
                    icon={ThemeIcon} 
                    text="Theme"
                    to="/theme"
                />
            </div>
            <div>
                <IconButton 
                    icon={StatsIcon} 
                    text="Stats"
                    to="/stats"
                />
            </div>
            <div>
                <IconButton 
                    icon={SignOutIcon} 
                    text="Sign Out"
                    to="/sign_out"
                />
            </div>
        </div>
    );

    return (  
        /* 
            setDisplay 被允許給函式當參數，其中的 curr 會讀取 display 的當前狀態 false 並更改為 true
            display 為控制顯事與否的布林值，可利用 && 運算子控制整個變數 Card 的內容是否該顯示 
        */
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <FunctionalIcon 
                    icon={MenuIcon} 
                    iconClass={styles.icon}
                    onClick={() => {setDisplay((curr) => !curr)}}
                />
            </div>
            <div className={styles.cardContainer}>
                {display && <Card />}  
            </div>
        </div>
        
    )
}

export default MenuDropDown;
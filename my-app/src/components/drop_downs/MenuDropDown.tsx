import styles from "./MenuDropDown.module.css";
import FunctionalIcon from "../icons/FunctionalIcon";
import MenuIcon from "../icons/icons/MenuIcon";
import IconButton from "../buttons/IconButtton/IconButton";
import AccountIcon from "../icons/icons/AccountIcon";
import ThemeIcon from "../icons/icons/ThemeIcon";
import StatsIcon from "../icons/icons/StatsIcon";
import SignOutIcon from "../icons/icons/SignOutIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface menuDropDownProps {
    onNavigate: () => void
}

function MenuDropDown({
    onNavigate
}: menuDropDownProps) {
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();
    // useState 是其中一種 hook，是使用 setDisplay 函式去更改 display 常數的作法，display 預設值為 false

    const handleNavigation = (to: string) => {
        onNavigate();
        setTimeout(() => {
            navigate(to);
        }, 1000)
    }

    const Card = () => (
        <div className={styles.card}>
            <div>
                <IconButton 
                    icon={AccountIcon} 
                    onClick={() => handleNavigation("/account")}
                    text="Account"
                />
            </div>
            <div>
                <IconButton 
                    icon={ThemeIcon} 
                    onClick={() => handleNavigation("/theme")}
                    text="Theme"
                />
            </div>
            <div>
                <IconButton 
                    icon={StatsIcon} 
                    onClick={() => handleNavigation("/stats")}
                    text="Stats"
                />
            </div>
            <div>
                <IconButton 
                    icon={SignOutIcon} 
                    onClick={() => handleNavigation("/sign_out")}
                    text="Sign Out"
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
import type { Icon } from "../../icons/icons/BaseIcon";
import styles from "./IconButton.module.css";

interface iconButtonProps {
    icon: Icon,         // 匯入一種型別叫 Icon，只要給他有使用過 iconProps 參數的 icon 圖片，就是 type = Icon。
    text: string,
    iconClass?: string,
    buttonClass?: string;
    textClass?: string;
    onClick?: () => void,
    size?: string,
}

function IconButton ({
    icon: ButtonIcon,  // 符合使用 iconProps 參數的規範，實作出一個型別是 Icon 的元件 ButtonIcon。
    text,
    buttonClass="",
    textClass="",
    onClick,
    size="50px",
}: iconButtonProps
) {
  return (
    <button
        className={`${styles.button} ${buttonClass}`}
        onClick={onClick}
    >
    <div className={styles.iconContainer} 
        style={{
            width: size,
            height: size
        }}>
        <ButtonIcon/>
    </div>
        <p className={`${styles.text} ${textClass || ""}`}>{text}</p>
    </button>
  );
}

export default IconButton;
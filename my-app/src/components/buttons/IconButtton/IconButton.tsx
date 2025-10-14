import type { Icon } from "../../icons/icons/BaseIcon";
import { Link } from "react-router-dom";
import styles from "./IconButton.module.css";

interface iconButtonProps {
    icon: Icon,         // 匯入一種型別叫 Icon，只要給他有使用過 iconProps 參數的 icon 圖片，就是 type = Icon。
    text: string,
    to: string,
    iconClass?: string,
    buttonClass?: string;
    onClick?: () => void,
}

function IconButton ({
    icon: ButtonIcon,  // 符合使用 iconProps 參數的規範，實作出一個型別是 Icon 的元件 ButtonIcon。
    text,
    to,
    buttonClass="",
    onClick
}: iconButtonProps
) {
    const content = (
    <button
      className={`${styles.button} ${buttonClass}`}
      onClick={onClick}
    >
      <ButtonIcon />
      {text}
    </button>
  );

  // 若有傳入 to，就包在 <Link> 中；否則直接回傳按鈕
  return to ? <Link to={to} className={styles.iconButtonLink}>{content}</Link> : content;
}

export default IconButton;
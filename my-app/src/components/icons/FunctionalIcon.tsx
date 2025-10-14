import styles from "./FunctionalIcon.module.css";
import type { Icon } from "./icons/BaseIcon";

interface functionalIconProps {
    icon: Icon;
    iconClass?: string;
    onClick?: () => void;
}

function FunctionalIcon ({
    icon: Icon, 
    iconClass="",
    onClick
}: functionalIconProps) {
    return (
        <div onClick={onClick} className={`${styles.icon} ${iconClass}`}>
            <Icon />
        </div>
    );
}

export default FunctionalIcon
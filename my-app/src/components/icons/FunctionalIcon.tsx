import styles from "./FunctionalIcon.module.css";
import type { Icon } from "./icons/BaseIcon";
import { useTransition } from "../../providers/TransitionProvider"; 

interface functionalIconProps {
    icon: Icon;
    to?: string;
    iconClass?: string;
    onClick?: () => void;
}

function FunctionalIcon ({
    icon: Icon,
    to,
    iconClass="",
    onClick
}: functionalIconProps) {
    const { go } = useTransition();
    const className = `${styles.icon} ${iconClass}`;

    const handleClick = () => {
        onClick?.();
        if (to) {
            go(to);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
        >
            <Icon/>
        </button>
    );
}

export default FunctionalIcon
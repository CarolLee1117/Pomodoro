import styles from "./FunctionalIcon.module.css";
import type { Icon } from "./icons/BaseIcon";
import { Link } from "react-router-dom";

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
    const className = `${styles.icon} ${iconClass}`;

    if (to) {
        return (
            <Link
                to={to}
                onClick={onClick}
                className={className}
            >
                <Icon/>
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={className}
        >
            <Icon/>
        </button>
    );
}

export default FunctionalIcon
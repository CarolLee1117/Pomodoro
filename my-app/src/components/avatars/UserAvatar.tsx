import type { CSSProperties } from "react";
import styles from "./UserAvatar.module.css";

interface userAvatarProps {
    url : string;
    width?: number;
    height?: number; 
    align?: CSSProperties["alignSelf"];
}

function UserAvatar({
    url, 
    width=270, 
    height=270,
    align="center"
}: userAvatarProps) {
    return (
        <div 
            className={styles.avatar}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                alignSelf: `${align}`
            }}
        >
            <img src={url}/>
        </div>
    ); 
}

export default UserAvatar;
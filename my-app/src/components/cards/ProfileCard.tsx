import styles from "./ProfileCard.module.css"

interface profileCardProps {
    name: string;
    pwd: string;
    email: string;
    birthday: string;
}

function ProfileCard({
    name = "",
    pwd = "",
    email = "",
    birthday = ""
}: profileCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <p className={styles.topic}>Username</p>
                <p className={styles.data}>{name}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.topic}>Password</p>
                <input className={styles.data} value={pwd} type="password" readOnly />
            </div>
            <div className={styles.row}>
                <p className={styles.topic}>Email</p>
                <p className={styles.data}>{email}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.topic}>Birthday</p>
                <p className={styles.data}>{birthday}</p>
            </div>
        </div>
    );
}

export default ProfileCard;
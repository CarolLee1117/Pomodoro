import styles from "./ProfileCard.module.css";

interface profileCardProps {
    name: string;
    pwd: string;
    email: string;
    birthday: string;
    editable: boolean;
    onChange: (key: "name" | "pwd" | "email" | "birthday", value: string) => void;
}

function ProfileCard({
    name,
    pwd,
    email,
    birthday,
    editable,
    onChange
}: profileCardProps) {
    return (
        <div className={styles.card}>
            <div className={`${styles.row} ${editable ? styles.editableRow : ""}`}>
                <p className={styles.topic}>Username</p>
                <input
                    className={styles.data}
                    value={name}
                    readOnly={!editable}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </div>
            <div className={`${styles.row} ${editable ? styles.editableRow : ""}`}>
                <p className={styles.topic}>Password</p>
                <input
                    className={styles.data}
                    type="password"
                    value={pwd}
                    readOnly={!editable}
                    onChange={(e) => onChange("pwd", e.target.value)}
                />
            </div>
            <div className={`${styles.row} ${editable ? styles.editableRow : ""}`}>
                <p className={styles.topic}>Email</p>
                <input
                    className={styles.data}
                    value={email}
                    readOnly={!editable}
                    onChange={(e) => onChange("email", e.target.value)}
                />
            </div>
            <div className={`${styles.row} ${editable ? styles.editableRow : ""}`}>
                <p className={styles.topic}>Birthday</p>
                <input
                    className={styles.data}
                    value={birthday}
                    readOnly={!editable}
                    onChange={(e) => onChange("birthday", e.target.value)}
                />
            </div>
        </div>
    );
}

export default ProfileCard;
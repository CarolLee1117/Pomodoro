import styles from "./StreakBanner.module.css";

type Props = {
    streakDays: number;
};

export default function StreakBanner({ streakDays }: Props) {
    return (
        <div className={styles.banner}>
            Achieved the goal for <b>{streakDays}</b> consecutive days!
        </div>
    );
}

import styles from "./Insights.module.css";
import MenuDropDown from "../components/drop_down/MenuDropDown";
import FunctionalIcon from "../components/icons/FunctionalIcon";
import HomeIcon from "../components/icons/icons/HomeIcon";
import Text from "../components/text/Text";
import { useTransition } from "../providers/TransitionProvider";
import { useInsights } from "../hooks/useInsights";

import KpiCard from "../components/charts/KpiCard";
import StreakBanner from "../components/charts/StreakBanner";
import WeeklyLineChartCard from "../components/charts/WeeklyLineChartCard";
import TimeDistributionPieCard from "../components/charts/TimeDistributionPieCard";

export default function Insights() {
    const { go } = useTransition();
    const { loading, daily, kpi, streakDays, pie } = useInsights();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <MenuDropDown />
                <FunctionalIcon icon={HomeIcon} onClick={() => go("/")} />
            </div>

            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.topRow}>
                        <div className={styles.kpiRow}>
                            <KpiCard label="Sessions Completed" value={kpi.sessionsCompleted} />
                            <KpiCard label="Total Focus Hour" value={kpi.totalFocusHour} />
                            <KpiCard label="Uncompleted" value={kpi.uncompletedCount} />
                        </div>

                        <div className={styles.bannerWrap}>
                            <StreakBanner streakDays={streakDays} />
                        </div>
                    </div>

                    <div className={styles.chartRow}>
                        <div className={styles.chartCol}>
                            <WeeklyLineChartCard data={daily} />
                        </div>
                        <div className={styles.chartCol}>
                            <TimeDistributionPieCard data={pie} />
                        </div>
                    </div>

                    {loading && <Text text="Loading..." textClass={styles.loading} />}
                </div>
            </div>
        </div>
    );
}

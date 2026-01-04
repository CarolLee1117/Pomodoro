import styles from "./WeeklyLineChartCard.module.css";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
} from "recharts";
import type { DailyStats } from "../../hooks/useInsights";

type Props = {
    data: DailyStats[];
};

export default function WeeklyLineChartCard({ data }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.inner}>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(0,0,0,0.08)" />
                        <XAxis dataKey="label" tick={{ fill: "var(--c-btn-hover-bg)" }} />
                        <YAxis tick={{ fill: "var(--c-btn-hover-bg)" }} />
                        <Tooltip
                            contentStyle={{
                                background: "var(--c-card)",
                                border: "none",
                                borderRadius: 10,
                            }}
                            labelStyle={{ color: "var(--c-btn-hover-bg)" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="focusMinutes"
                            stroke="var(--c-text)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="uncompletedCount"
                            stroke="var(--c-danger-hover-bg)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

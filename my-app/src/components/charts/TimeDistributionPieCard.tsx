import styles from "./TimeDistributionPieCard.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type PieItem = { name: string; value: number };

type Props = {
    data: PieItem[];
};

const COLORS = [
    "var(--c-text)",              // Focus
    "var(--c-btn-hover-bg)",      // Break
    "var(--c-danger-bg)",         // Pause
];

export default function TimeDistributionPieCard({ data }: Props) {
    const filteredData = data.filter(
        (item) => item.name !== "Uncompleted"
    );
    return (
        <div className={styles.card}>
            <div className={styles.inner}>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="40%"
                            cy="50%"
                            outerRadius={85}
                            innerRadius={0}
                            stroke="var(--c-card)"
                            strokeWidth={1}
                        >
                            {data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconType="circle"
                            wrapperStyle={{
                                color: "var(--c-btn-hover-bg)",
                                fontFamily: "var(--font-annapurna)",
                                fontSize: 14,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

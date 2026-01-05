import { useEffect, useMemo, useState } from "react";
import { fetchPomodoroSessions } from "../services/insightsApi";
import type { PomodoroSession } from "../services/insightsApi";

export type DailyStats = {
    date: string;               // YYYY-MM-DD
    label: string;              // Mon/Tue...
    pomodoros: number;          // completed focus count
    focusMinutes: number;       // completed focus minutes
    breakMinutes: number;
    pauseMinutes: number;
    uncompletedCount: number;   // uncompleted focus count (that day)
};

const weekdayLabel = (ymd: string) => {
    const d = new Date(ymd);
    const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return map[d.getDay()];
};

const groupByDate = (sessions: PomodoroSession[]) => {
    const map = new Map<string, PomodoroSession[]>();
    sessions.forEach((s) => {
        const arr = map.get(s.date) ?? [];
        arr.push(s);
        map.set(s.date, arr);
    });
    return map;
};

const sortAsc = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export const useInsights = () => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<PomodoroSession[]>([]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        fetchPomodoroSessions()
            .then((data) => {
                if (cancelled) return;
                setSessions(data);
            })
            .finally(() => {
                if (cancelled) return;
                setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const daily = useMemo<DailyStats[]>(() => {
        const byDate = groupByDate(sessions);
        const dates = Array.from(byDate.keys()).sort(sortAsc);

        return dates.map((date) => {
            const list = byDate.get(date) ?? [];

            const focusCompleted = list.filter((s) => s.mode === "focus" && s.completed);
            const focusMinutes = focusCompleted.reduce((sum, s) => sum + s.minutes, 0);

            const breakMinutes = list
                .filter((s) => s.mode === "break")
                .reduce((sum, s) => sum + s.minutes, 0);

            const pauseMinutes = list
                .filter((s) => s.mode === "pause")
                .reduce((sum, s) => sum + s.minutes, 0);

            const uncompletedCount = list.filter((s) => s.mode === "focus" && !s.completed).length;

            return {
                date,
                label: weekdayLabel(date),
                pomodoros: focusCompleted.length,
                focusMinutes,
                breakMinutes,
                pauseMinutes,
                uncompletedCount,
            };
        });
    }, [sessions]);

    const kpi = useMemo(() => {
        const sessionsCompleted = sessions.filter((s) => s.mode === "focus" && s.completed).length;

        const focusMinutes = sessions
            .filter((s) => s.mode === "focus" && s.completed)
            .reduce((sum, s) => sum + s.minutes, 0);

        const uncompletedCount = sessions.filter((s) => s.mode === "focus" && !s.completed).length;

        return {
            sessionsCompleted,
            totalFocusHour: Math.round((focusMinutes / 60) * 10) / 10,
            uncompletedCount,
        };
    }, [sessions]);

    const streakDays = useMemo(() => {
        if (daily.length === 0) return 0;

        const sorted = [...daily].sort((a, b) => sortAsc(a.date, b.date));
        let streak = 0;

        for (let i = sorted.length - 1; i >= 0; i--) {
            if (sorted[i].pomodoros >= 1) streak++;
            else break;
        }

        return streak;
    }, [daily]);

    const pie = useMemo(() => {
        const focus = sessions
            .filter((s) => s.mode === "focus" && s.completed)
            .reduce((sum, s) => sum + s.minutes, 0);

        const brk = sessions
            .filter((s) => s.mode === "break")
            .reduce((sum, s) => sum + s.minutes, 0);

        const pause = sessions
            .filter((s) => s.mode === "pause")
            .reduce((sum, s) => sum + s.minutes, 0);

        return [
            { name: "Focus Time", value: focus },
            { name: "Break Time", value: brk },
            { name: "Pause Time", value: pause },
        ];
    }, [sessions]);

    return {
        loading,
        daily,
        kpi,
        streakDays,
        pie,
    };
};

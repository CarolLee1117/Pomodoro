import type { DailyStats, PomodoroSession, Range } from "../types/insights";

export const toDailyStats = (sessions: PomodoroSession[], _range: Range): DailyStats[] => {
    const map = new Map<string, DailyStats>();

    sessions.forEach((s) => {
        if (s.mode !== "focus") return;
        if (!map.has(s.date)) map.set(s.date, { date: s.date, pomodoros: 0, focusMinutes: 0 });

        const d = map.get(s.date)!;
        if (s.completed) {
            d.pomodoros += 1;
            d.focusMinutes += s.minutes;
        }
    });

    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
};

export const calcKpis = (daily: DailyStats[]) => {
    const totalPomodoros = daily.reduce((sum, d) => sum + d.pomodoros, 0);
    const totalFocusMinutes = daily.reduce((sum, d) => sum + d.focusMinutes, 0);

    let streak = 0;
    for (let i = daily.length - 1; i >= 0; i--) {
        if (daily[i].pomodoros > 0) streak += 1;
        else break;
    }

    return { totalPomodoros, totalFocusMinutes, streak };
};

import type { PomodoroSession } from "../types/insights";

export const MOCK_SESSIONS: PomodoroSession[] = [
    { id: "s1", date: "2026-01-01", mode: "focus", minutes: 25, completed: true },
    { id: "s2", date: "2026-01-01", mode: "break", minutes: 5, completed: true },
    { id: "s3", date: "2026-01-02", mode: "focus", minutes: 25, completed: true },
    { id: "s4", date: "2026-01-02", mode: "focus", minutes: 25, completed: false },
    { id: "s5", date: "2026-01-03", mode: "focus", minutes: 30, completed: true },
    { id: "s6", date: "2026-01-04", mode: "focus", minutes: 30, completed: true },
];
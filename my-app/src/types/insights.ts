export type Mode = "focus" | "break" | "pause" | "uncompleted";
export type Range = "7d" | "30d";

export type PomodoroSession = {
    id: string;
    date: string;
    mode: Mode;
    minutes: number;
    completed: boolean;
};

export type DailyStats = {
    date: string;           // YYYY-MM-DD
    pomodoros: number;      // completed cycles count
    focusMinutes: number;   // completed focus minutes
}
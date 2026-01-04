export type PomodoroMode = "focus" | "break" | "pause" | "uncompleted";

export type PomodoroSession = {
    id: string;
    date: string;
    mode: "focus" | "break" | "pause" | "uncompleted";
    minutes: number;
    completed: boolean;
    // aborted?: boolean;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const toYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = pad2(d.getMonth() + 1);
    const day = pad2(d.getDate());
    return `${y}-${m}-${day}`;
};

const subDays = (base: Date, days: number) => {
    const d = new Date(base);
    d.setDate(d.getDate() - days);
    return d;
};

const makeId = () => crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const seededRand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const generateMockSessions = (days: number): PomodoroSession[] => {
    const today = new Date();
    const sessions: PomodoroSession[] = [];

    for (let i = 0; i < days; i++) {
        const date = toYmd(subDays(today, i));
        const seed = Number(date.replaceAll("-", "")); // stable by date

        const focusCount = Math.floor(seededRand(seed) * 6);
        for (let k = 0; k < focusCount; k++) {
            sessions.push({
                id: makeId(),
                date,
                mode: "focus",
                minutes: 25,
                completed: seededRand(seed + k) > 0.15, 
            });
        }

        const breakCount = Math.floor(seededRand(seed + 11) * 4);
        for (let k = 0; k < breakCount; k++) {
            sessions.push({
                id: makeId(),
                date,
                mode: "break",
                minutes: 5,
                completed: true,
            });
        }

        const pauseCount = Math.floor(seededRand(seed + 21) * 3);
        for (let k = 0; k < pauseCount; k++) {
            sessions.push({
                id: makeId(),
                date,
                mode: "pause",
                minutes: 2,
                completed: true,
            });
        }

        const uncompletedCount = Math.floor(seededRand(seed + 31) * 3);
        for (let k = 0; k < uncompletedCount; k++) {
            sessions.push({
                id: makeId(),
                date,
                mode: "uncompleted",
                minutes: 10 + Math.floor(seededRand(seed + 40 + k) * 16), // 10~25
                completed: false,
            });
        }
    }

    return sessions;
};

export const fetchPomodoroSessions = async () => {
    const days = 7;

    return new Promise<PomodoroSession[]>((resolve) => {
        setTimeout(() => {
            resolve(generateMockSessions(days));
        }, 350);
    });
};

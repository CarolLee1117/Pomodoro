import type { PomodoroSession } from "../types/insights";
import { MOCK_SESSIONS } from "./data";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const inRange = (_date: string, _range: Range) => {
    return true;
};

export const fakeApi = {
    async getSessions(range: Range): Promise<PomodoroSession[]> {
        await sleep(300);
        return MOCK_SESSIONS.filter((s) => inRange(s.date, range));
    },
};
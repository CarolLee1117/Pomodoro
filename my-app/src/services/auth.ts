// 串 API 用的

import axios from "axios";

const API_BASE = "http://localhost:3000";

export const login = async (name: string, pwd: string) => {
    const url = `${API_BASE}/api/login`;
    const data = {
        "name": name,
        "pwd": pwd
    };
    try {
        const resp = await axios.post(url, data);
        console.log(resp)
        return resp.data;
    }
    catch (err: any) {
        throw err; 
    }
}

export const hello = async () => {
    const url = `${API_BASE}/api/hello`;

    try {
        const resp = await axios.get(url);
        return resp;
    }
    catch (err: any) {
        console.log(err);
        throw err;
    }
}
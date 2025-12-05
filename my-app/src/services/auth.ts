// 串 API 用的
import axios from "axios";

const API_BASE = "http://localhost:3000";

// 製作 login 功能（函式）給其他檔案使用，可匯入
export const login = async (name: string, pwd: string) => { // 因為內部資料有使用 await 所以要做異步 async ---> 2.
    const url = `${API_BASE}/api/login`;
    const data = {
        "name": name,
        "pwd": pwd
    };
    try {
        const resp = await axios.post(url, data); // 拿到資料後才可以做下一件事，所以需要用 await ---> 1.
        console.log(resp)
        return resp.data;
    }
    catch (err: any) {
        throw err; 
    }
}
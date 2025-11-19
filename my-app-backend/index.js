const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173"}));

// API ENDPOINT: [GET] /api/hello
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend" });
});

const MOCK_USER = {
    name: "una",
    pwd: "123456",
    id: 1
};

app.post("/api/login", (req, res) => {
    const { name, pwd } = req.body;

    if (name === MOCK_USER.name && pwd === MOCK_USER.pwd) {
        return res.json({
            message: "login success",
            user: { id: 1, name },
            token: "fake-jwt-token-abc123"
        });
    }

    return res.status(401).json({ message: "Account or password error. Please check again."});
});

app.listen(3000, () => {
    console.log("Backend running at http://localhost:3000");
});
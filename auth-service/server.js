const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const cors = require('cors');
const {getInfoFromQueue} = require("./broker");

let corsOptions = {
    origin: ['http://localhost:3000'],
};

app.use(cors(corsOptions));

app.post('/auth/verify', (req, res) => {
    // Fake authentication
    const token = req.headers['authorization'];
    if (token) {
        return res.json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
});

app.listen(PORT, () => {
    console.log(`Auth service listening on port ${PORT}`);
    getInfoFromQueue();
});

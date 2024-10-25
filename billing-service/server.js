const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

let corsOptions = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOptions));

app.get('/billing', (req, res) => {
    const invoice = {
        client: "Jean Bat",
        montant: 344.00
    };
    res.json(invoice);
});

app.listen(PORT, () => {
    console.log(`Billing service listening on port ${PORT}`);
});

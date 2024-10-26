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

app.get('/billing/devis', (req, res) => {
    const devis =['devis1', "devis2", "devis 3"];
    res.json(devis);
});

app.listen(PORT, () => {
    console.log(`Billing service listening on port ${PORT}`);
});

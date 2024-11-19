const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
var amqp = require('amqplib/callback_api');


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

app.get('/billing/send-mail', (req, res) => {
    // const amqpUrl = 'amqp://user:password@rabbitmq';
    const amqpUrl = 'amqp://guest:guest@rabbitmq';  // Mettez à jour avec vos identifiants RabbitMQ

    amqp.connect(amqpUrl, function(error0, connection) {
        if (error0) {
            return res.status(500).send('Connection error: ' + error0.message);
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                return res.status(500).send('Channel error: ' + error1.message);
            }
            var queue = 'hello';
            var msg = 'Hello world';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
            res.send("Message sent");  // Répondez à la requête
        });
    });
});




app.listen(PORT, () => {
    console.log(`Billing service listening on port ${PORT}`);
});

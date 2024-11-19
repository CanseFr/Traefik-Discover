import amqp from 'amqplib/callback_api';


function getInfoFromQueue() {
    const amqpUrl = 'amqp://guest:guest@rabbitmq';
    amqp.connect(amqpUrl, (error0, connection) => {
        if (error0) {
            console.error('Connection error:', error0);
            return;
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                console.error('Channel error:', error1);
                return;
            }

            const queue = 'hello';

            channel.assertQueue(queue, { durable: false });

            console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, (msg) => {
                console.log(` [x] Received: ${msg.content.toString()}`);
            }, { noAck: true });
        });
    });
}

export { getInfoFromQueue};

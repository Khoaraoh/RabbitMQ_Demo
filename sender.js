import amqp from 'amqplib/callback_api.js';

amqp.connect(`amqp://localhost`, (err, connection) => {
    if(err)
    {
        console.log(err);
    }
    connection.createChannel((err, channel) => {
        if(err)
        {
            console.log(err);
        }
        const QUEUE = 'jobs';
        const msg = 'hello world 2';
        channel.assertQueue(QUEUE, { durable: true });
        channel.sendToQueue(QUEUE, Buffer.from(msg));
        // channel.sendToQueue(QUEUE, Buffer.from('hello 2'));
        // channel.sendToQueue(QUEUE, Buffer.from('hello 3'));
        console.log("jobs sent successfully");

        setTimeout(() => {
            connection.close();
            console.log('disconnected');
        }, 1000);
    })
});
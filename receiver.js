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
        channel.assertQueue(QUEUE, {
            durable: true});
        // channel.prefetch(3);
        channel.consume(QUEUE, (msg) => {
            if(msg!=null)
            {
                console.log(msg.content.toString());
            }
        },{ noAck: true});
        setTimeout(() => {
            connection.close();
            console.log('disconnected');
        }, 1000);
    })
});
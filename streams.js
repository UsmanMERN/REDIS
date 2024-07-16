const Redis = require('ioredis');

// Create a Redis client
const client = new Redis();

async function addToStream(streamName, fieldName, value) {
    const result = await client.xadd(streamName, '*', fieldName, value);
    console.log(`Added to stream ${streamName}:`, result);
    return result;
}

async function readFromStream(streamName, count = 10) {
    const result = await client.xread('COUNT', count, 'STREAMS', streamName, '0');
    console.log(`Read from stream ${streamName}:`, result);
    return result;
}

async function createConsumerGroup(streamName, groupName, startID = '$') {
    try {
        await client.xgroup('CREATE', streamName, groupName, startID, 'MKSTREAM');
        console.log(`Consumer group ${groupName} created for stream ${streamName}`);
    } catch (error) {
        if (error.message.includes('BUSYGROUP')) {
            console.log(`Consumer group ${groupName} already exists for stream ${streamName}`);
        } else {
            throw error;
        }
    }
}

async function readAsConsumer(streamName, groupName, consumerName, count = 10) {
    const result = await client.xreadgroup('GROUP', groupName, consumerName, 'COUNT', count, 'STREAMS', streamName, '>');
    console.log(`Consumer ${consumerName} read from group ${groupName}:`, result);
    return result;
}

async function acknowledgeMessage(streamName, groupName, id) {
    const result = await client.xack(streamName, groupName, id);
    console.log(`Acknowledged message ${id} in group ${groupName}:`, result);
    return result;
}

async function init() {
    const streamName = 'mystream';
    const groupName = 'mygroup';
    const consumerName = 'consumer1';

    // Add entries to the stream
    await addToStream(streamName, 'temperature', '25');
    await addToStream(streamName, 'humidity', '60');

    // Read from the stream
    await readFromStream(streamName);

    // Create a consumer group
    await createConsumerGroup(streamName, groupName);

    // Read as a consumer
    const messages = await readAsConsumer(streamName, groupName, consumerName);

    // Process and acknowledge messages
    if (messages && messages.length > 0) {
        for (const [, entries] of messages) {
            for (const [id, fields] of entries) {
                console.log(`Processing message ${id}:`, fields);
                // Process the message here

                // Acknowledge the message
                await acknowledgeMessage(streamName, groupName, id);
            }
        }
    }

    // Close the Redis connection
    await client.quit();
}

init().catch(console.error);
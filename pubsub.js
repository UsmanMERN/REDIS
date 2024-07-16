const Redis = require('ioredis');

// Create Redis clients for publisher and subscriber
const publisher = new Redis();
const subscriber = new Redis();

async function pubSubExample() {
    console.log("Starting Redis Pub/Sub Example");

    // Step 1: Subscribe to channels
    console.log("\nStep 1: Subscribing to channels");
    await subscriber.subscribe('news', 'sports');
    console.log("Subscribed to 'news' and 'sports' channels");

    // Step 2: Set up message handler
    subscriber.on('message', (channel, message) => {
        console.log(`Received message from ${channel} channel: ${message}`);
    });

    // Step 3: Publish messages
    console.log("\nStep 3: Publishing messages");
    await publisher.publish('news', 'Breaking news: Redis is awesome!');
    await publisher.publish('sports', 'Sports update: Redis wins the tech league!');

    // Step 4: Pattern subscription
    console.log("\nStep 4: Pattern subscription");
    await subscriber.psubscribe('tech:*');
    console.log("Subscribed to pattern 'tech:*'");

    // Step 5: Publish to pattern-matched channel
    console.log("\nStep 5: Publishing to pattern-matched channel");
    await publisher.publish('tech:database', 'Redis 7.0 released with new features!');

    // Step 6: Get number of subscribers
    console.log("\nStep 6: Getting number of subscribers");
    const [newsCount, sportsCount] = await publisher.pubsub('NUMSUB', 'news', 'sports');
    console.log(`'news' channel has ${newsCount} subscribers`);
    console.log(`'sports' channel has ${sportsCount} subscribers`);

    // Step 7: Get active channels
    console.log("\nStep 7: Getting active channels");
    const channels = await publisher.pubsub('CHANNELS');
    console.log("Active channels:", channels);

    // Step 8: Unsubscribe from a channel
    console.log("\nStep 8: Unsubscribing from 'sports' channel");
    await subscriber.unsubscribe('sports');
    console.log("Unsubscribed from 'sports' channel");

    // Step 9: Publish to unsubscribed channel
    console.log("\nStep 9: Publishing to unsubscribed channel");
    await publisher.publish('sports', 'This message won\'t be received');

    // Clean up: Unsubscribe from all channels and patterns
    console.log("\nCleaning up: Unsubscribing from all channels and patterns");
    await subscriber.unsubscribe();
    await subscriber.punsubscribe();

    // Close Redis connections
    publisher.quit();
    subscriber.quit();
}

pubSubExample().catch(console.error);
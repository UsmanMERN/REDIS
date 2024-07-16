const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function stringsExample() {
    console.log("Starting Redis Strings Example");

    // Step 1: Set a simple string value
    console.log("\nStep 1: Setting a simple string value");
    await redis.set('greeting', 'Hello, Redis!');
    console.log("Set 'greeting' to 'Hello, Redis!'");

    // Step 2: Get a string value
    console.log("\nStep 2: Getting a string value");
    const greeting = await redis.get('greeting');
    console.log("Value of 'greeting':", greeting);

    // Step 3: Set multiple string values at once
    console.log("\nStep 3: Setting multiple string values");
    await redis.mset('name', 'John Doe', 'age', '30', 'city', 'New York');
    console.log("Set 'name', 'age', and 'city'");

    // Step 4: Get multiple string values at once
    console.log("\nStep 4: Getting multiple string values");
    const [name, age, city] = await redis.mget('name', 'age', 'city');
    console.log("Name:", name, "Age:", age, "City:", city);

    // Step 5: Increment a numeric string value
    console.log("\nStep 5: Incrementing a numeric string value");
    await redis.set('counter', '10');
    const newCounter = await redis.incr('counter');
    console.log("Incremented 'counter', new value:", newCounter);

    // Step 6: Append to an existing string
    console.log("\nStep 6: Appending to an existing string");
    await redis.append('greeting', ' How are you?');
    const newGreeting = await redis.get('greeting');
    console.log("New greeting:", newGreeting);

    // Step 7: Get a substring
    console.log("\nStep 7: Getting a substring");
    const partialGreeting = await redis.getrange('greeting', 0, 4);
    console.log("First 5 characters of greeting:", partialGreeting);

    // Step 8: Set a string value with expiration
    console.log("\nStep 8: Setting a string with expiration");
    await redis.set('temporary', 'I will disappear soon', 'EX', 10);
    console.log("Set 'temporary' with 10-second expiration");

    // Close the Redis connection
    redis.quit();
}

stringsExample().catch(console.error);
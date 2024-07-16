const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function setsExample() {
    console.log("Starting Redis Sets Example");

    // Step 1: Add members to sets
    console.log("\nStep 1: Adding members to sets");
    await redis.sadd('fruits', 'apple', 'banana', 'cherry');
    await redis.sadd('citrus', 'lemon', 'lime', 'orange');
    await redis.sadd('red_fruits', 'apple', 'cherry', 'strawberry');
    console.log("Added members to 'fruits', 'citrus', and 'red_fruits' sets");

    // Step 2: Get all members of a set
    console.log("\nStep 2: Getting all members of 'fruits' set");
    const fruitsMembers = await redis.smembers('fruits');
    console.log("Fruits:", fruitsMembers);

    // Step 3: Check if a member exists in a set
    console.log("\nStep 3: Checking if 'banana' is in 'fruits' set");
    const isBananaInFruits = await redis.sismember('fruits', 'banana');
    console.log("Is banana in fruits?", isBananaInFruits);

    // Step 4: Get the number of members in a set
    console.log("\nStep 4: Getting the number of members in 'citrus' set");
    const citrusCount = await redis.scard('citrus');
    console.log("Number of citrus fruits:", citrusCount);

    // Step 5: Remove a member from a set
    console.log("\nStep 5: Removing 'banana' from 'fruits' set");
    await redis.srem('fruits', 'banana');
    console.log("Removed 'banana' from 'fruits'");

    // Step 6: Perform set operations
    console.log("\nStep 6: Performing set operations");
    const intersection = await redis.sinter('fruits', 'red_fruits');
    console.log("Intersection of 'fruits' and 'red_fruits':", intersection);

    const difference = await redis.sdiff('fruits', 'red_fruits');
    console.log("Difference between 'fruits' and 'red_fruits':", difference);

    const union = await redis.sunion('fruits', 'citrus');
    console.log("Union of 'fruits' and 'citrus':", union);

    // Close the Redis connection
    redis.quit();
}

setsExample().catch(console.error);
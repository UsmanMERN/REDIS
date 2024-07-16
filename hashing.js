const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function hashesExample() {
    console.log("Starting Redis Hashes Example");

    // Step 1: Set multiple fields in a hash
    console.log("\nStep 1: Setting multiple fields in 'user:1001' hash");
    await redis.hmset('user:1001', {
        'username': 'johndoe',
        'email': 'john@example.com',
        'age': '30'
    });
    console.log("Set multiple fields in 'user:1001' hash");

    // Step 2: Get all fields and values from the hash
    console.log("\nStep 2: Getting all fields and values from 'user:1001' hash");
    const userInfo = await redis.hgetall('user:1001');
    console.log("User info:", userInfo);

    // Step 3: Get specific fields from the hash
    console.log("\nStep 3: Getting specific fields (username, email) from 'user:1001' hash");
    const [username, email] = await redis.hmget('user:1001', 'username', 'email');
    console.log("Username:", username, "Email:", email);

    // Step 4: Check if a field exists in the hash
    console.log("\nStep 4: Checking if 'age' field exists in 'user:1001' hash");
    const ageExists = await redis.hexists('user:1001', 'age');
    console.log("Does 'age' field exist?", ageExists);

    // Step 5: Get the number of fields in the hash
    console.log("\nStep 5: Getting the number of fields in 'user:1001' hash");
    const fieldCount = await redis.hlen('user:1001');
    console.log("Number of fields:", fieldCount);

    // Step 6: Increment a numeric field in the hash
    console.log("\nStep 6: Incrementing the 'age' field in 'user:1001' hash");
    const newAge = await redis.hincrby('user:1001', 'age', 1);
    console.log("New age:", newAge);

    // Step 7: Get all field names from the hash
    console.log("\nStep 7: Getting all field names from 'user:1001' hash");
    const fieldNames = await redis.hkeys('user:1001');
    console.log("Field names:", fieldNames);

    // Step 8: Get all values from the hash
    console.log("\nStep 8: Getting all values from 'user:1001' hash");
    const values = await redis.hvals('user:1001');
    console.log("Values:", values);

    // Step 9: Delete a field from the hash
    console.log("\nStep 9: Deleting 'email' field from 'user:1001' hash");
    await redis.hdel('user:1001', 'email');
    console.log("Deleted 'email' field");

    // Step 10: Set a field only if it doesn't exist
    console.log("\nStep 10: Setting 'status' field only if it doesn't exist");
    const wasSet = await redis.hsetnx('user:1001', 'status', 'active');
    console.log("Was 'status' field set?", wasSet);

    // Step 11: Final state of the hash
    console.log("\nStep 11: Checking final state of 'user:1001' hash");
    const finalState = await redis.hgetall('user:1001');
    console.log("Final state of 'user:1001' hash:", finalState);

    // Close the Redis connection
    redis.quit();
}

hashesExample().catch(console.error);
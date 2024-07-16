const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function listsExample() {
    console.log("Starting Redis Lists Example");

    // Step 1: Push elements to a list from the right
    console.log("\nStep 1: Pushing elements to 'mylist' from the right");
    await redis.rpush('mylist', 'apple', 'banana', 'cherry');
    console.log("Added 'apple', 'banana', 'cherry' to 'mylist'");

    // Step 2: Push an element to the list from the left
    console.log("\nStep 2: Pushing an element from the left");
    await redis.lpush('mylist', 'dragonfruit');
    console.log("Added 'dragonfruit' to the left of 'mylist'");

    // Step 3: Get the length of the list
    console.log("\nStep 3: Getting the length of 'mylist'");
    const length = await redis.llen('mylist');
    console.log("Length of 'mylist':", length);

    // Step 4: Get all elements in the list
    console.log("\nStep 4: Getting all elements in 'mylist'");
    const allElements = await redis.lrange('mylist', 0, -1);
    console.log("All elements in 'mylist':", allElements);

    // Step 5: Get element by index
    console.log("\nStep 5: Getting element at index 2 in 'mylist'");
    const element = await redis.lindex('mylist', 2);
    console.log("Element at index 2:", element);

    // Step 6: Remove and get an element from the right
    console.log("\nStep 6: Removing and getting an element from the right");
    const poppedElement = await redis.rpop('mylist');
    console.log("Popped element from the right:", poppedElement);

    // Step 7: Remove and get an element from the left
    console.log("\nStep 7: Removing and getting an element from the left");
    const shiftedElement = await redis.lpop('mylist');
    console.log("Popped element from the left:", shiftedElement);

    // Step 8: Insert an element at a specific position
    console.log("\nStep 8: Inserting 'elderberry' before 'banana'");
    await redis.linsert('mylist', 'BEFORE', 'banana', 'elderberry');
    console.log("Inserted 'elderberry' before 'banana'");

    // Step 9: Trim the list to keep only a range of elements
    console.log("\nStep 9: Trimming 'mylist' to keep only the first two elements");
    await redis.ltrim('mylist', 0, 1);
    console.log("Trimmed 'mylist' to keep only the first two elements");

    // Step 10: Final state of the list
    console.log("\nStep 10: Checking final state of 'mylist'");
    const finalState = await redis.lrange('mylist', 0, -1);
    console.log("Final state of 'mylist':", finalState);

    // Close the Redis connection
    redis.quit();
}

listsExample().catch(console.error);
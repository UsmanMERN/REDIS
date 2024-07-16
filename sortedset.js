const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function sortedSetsExample() {
    console.log("Starting Redis Sorted Sets Example");

    // Step 1: Add members to a sorted set
    console.log("\nStep 1: Adding members to 'leaderboard' sorted set");
    await redis.zadd('leaderboard', 100, 'player1', 200, 'player2', 150, 'player3');
    console.log("Added player1 (100), player2 (200), and player3 (150) to 'leaderboard'");

    // Step 2: Get the score of a member
    console.log("\nStep 2: Getting the score of player2");
    const player2Score = await redis.zscore('leaderboard', 'player2');
    console.log("Score of player2:", player2Score);

    // Step 3: Get the rank of a member
    console.log("\nStep 3: Getting the rank of player3");
    const player3Rank = await redis.zrevrank('leaderboard', 'player3');
    console.log("Rank of player3 (0-based, descending order):", player3Rank);

    // Step 4: Increment the score of a member
    console.log("\nStep 4: Incrementing the score of player1 by 50");
    const newPlayer1Score = await redis.zincrby('leaderboard', 50, 'player1');
    console.log("New score of player1:", newPlayer1Score);

    // Step 5: Get the number of members in the sorted set
    console.log("\nStep 5: Getting the number of members in 'leaderboard'");
    const memberCount = await redis.zcard('leaderboard');
    console.log("Number of members in 'leaderboard':", memberCount);

    // Step 6: Get members and scores within a score range
    console.log("\nStep 6: Getting members with scores between 100 and 160");
    const membersInRange = await redis.zrangebyscore('leaderboard', 100, 160, 'WITHSCORES');
    console.log("Members with scores between 100 and 160:", membersInRange);

    // Step 7: Get top 2 players (by score)
    console.log("\nStep 7: Getting top 2 players");
    const top2Players = await redis.zrevrange('leaderboard', 0, 1, 'WITHSCORES');
    console.log("Top 2 players:", top2Players);

    // Step 8: Remove a member from the sorted set
    console.log("\nStep 8: Removing player2 from 'leaderboard'");
    await redis.zrem('leaderboard', 'player2');
    console.log("Removed player2 from 'leaderboard'");

    // Step 9: Get the number of members within a score range
    console.log("\nStep 9: Counting members with scores between 120 and 200");
    const countInRange = await redis.zcount('leaderboard', 120, 200);
    console.log("Number of members with scores between 120 and 200:", countInRange);

    // Step 10: Get all members and their scores, sorted by score
    console.log("\nStep 10: Getting all members and scores, sorted by score");
    const allMembersAndScores = await redis.zrange('leaderboard', 0, -1, 'WITHSCORES');
    console.log("All members and scores:", allMembersAndScores);

    // Close the Redis connection
    redis.quit();
}

sortedSetsExample().catch(console.error);
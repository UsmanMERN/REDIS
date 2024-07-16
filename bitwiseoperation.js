const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function bitwiseOperationsExample() {
    console.log("Starting Redis Bitwise Operations Example");

    // Step 1: Set bits using SETBIT
    console.log("\nStep 1: Setting individual bits");
    await redis.setbit('user:active', 1, 1);  // Set 2nd bit to 1
    await redis.setbit('user:active', 3, 1);  // Set 4th bit to 1
    await redis.setbit('user:active', 5, 1);  // Set 6th bit to 1
    console.log("Set bits 1, 3, and 5 to 1 in 'user:active'");

    // Step 2: Get bit value using GETBIT
    console.log("\nStep 2: Getting individual bit values");
    const bit1 = await redis.getbit('user:active', 1);
    const bit2 = await redis.getbit('user:active', 2);
    console.log("Bit 1 value:", bit1, "Bit 2 value:", bit2);

    // Step 3: Count set bits using BITCOUNT
    console.log("\nStep 3: Counting set bits");
    const setBits = await redis.bitcount('user:active');
    console.log("Number of set bits in 'user:active':", setBits);

    // Step 4: Perform bitwise AND operation using BITOP
    console.log("\nStep 4: Performing bitwise AND operation");
    await redis.setbit('user:admin', 1, 1);  // Set 2nd bit to 1
    await redis.setbit('user:admin', 4, 1);  // Set 5th bit to 1
    await redis.bitop('AND', 'user:active_admin', 'user:active', 'user:admin');
    const activeAdminBits = await redis.bitcount('user:active_admin');
    console.log("Number of set bits in 'user:active_admin' after AND operation:", activeAdminBits);

    // Step 5: Perform bitwise OR operation using BITOP
    console.log("\nStep 5: Performing bitwise OR operation");
    await redis.bitop('OR', 'user:all_roles', 'user:active', 'user:admin');
    const allRolesBits = await redis.bitcount('user:all_roles');
    console.log("Number of set bits in 'user:all_roles' after OR operation:", allRolesBits);

    // Step 6: Find first set bit using BITPOS
    console.log("\nStep 6: Finding position of first set bit");
    const firstSetBit = await redis.bitpos('user:active', 1);
    console.log("Position of first set bit in 'user:active':", firstSetBit);

    // Step 7: Get string value of bit array
    console.log("\nStep 7: Getting string value of bit array");
    const binaryString = await redis.get('user:active');
    console.log("Binary string representation of 'user:active':", binaryString);

    // Step 8: Set multiple bits at once using string value
    console.log("\nStep 8: Setting multiple bits at once using string value");
    await redis.set('user:permissions', Buffer.from([0b11001010]));  // Binary: 11001010
    const permissionsBits = await redis.bitcount('user:permissions');
    console.log("Number of set bits in 'user:permissions':", permissionsBits);

    // Close the Redis connection
    redis.quit();
}

bitwiseOperationsExample().catch(console.error);
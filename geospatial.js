const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis();

async function geoExample() {
    console.log("Starting Redis Geospatial Example");

    // Step 1: Add locations to a geo set
    console.log("\nStep 1: Adding locations");
    await redis.geoadd('cities',
        -122.4194, 37.7749, 'San Francisco',
        -74.0060, 40.7128, 'New York',
        -0.1278, 51.5074, 'London'
    );
    console.log("Added San Francisco, New York, and London to 'cities'");

    // Step 2: Get coordinates of a location
    console.log("\nStep 2: Getting coordinates of London");
    const londonCoords = await redis.geopos('cities', 'London');
    console.log("London coordinates:", londonCoords[0]);

    // Step 3: Calculate distance between two cities
    console.log("\nStep 3: Calculating distance between San Francisco and New York");
    const distance = await redis.geodist('cities', 'San Francisco', 'New York', 'km');
    console.log(`Distance: ${distance} km`);

    // Step 4: Find cities within a radius
    console.log("\nStep 4: Finding cities within 5000 km of London");
    const nearbyCities = await redis.georadius('cities', -0.1278, 51.5074, 5000, 'km');
    console.log("Nearby cities:", nearbyCities);

    // Step 5: Get geohash strings
    console.log("\nStep 5: Getting geohash strings");
    const geoHashes = await redis.geohash('cities', 'San Francisco', 'New York', 'London');
    console.log("Geohashes:", geoHashes);

    // Close the Redis connection
    redis.quit();
}

geoExample().catch(console.error);
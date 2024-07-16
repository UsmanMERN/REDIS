# Redis Basic Commands

## Strings

### Basic Operations
- **SET key value**: Sets the value of a key.
  ```sh
  SET mykey "Hello"
  ```
- **GET key**: Gets the value of a key.
  ```sh
  GET mykey
  ```
- **SETNX key value**: Sets the value of a key if it does not exist.
  ```sh
  SETNX mykey "World"
  ```
- **MGET key1 key2 ... keyN**: Gets the values of multiple keys.
  ```sh
  MGET key1 key2 key3
  ```
- **MSET key1 value1 key2 value2 ... keyN valueN**: Sets the values of multiple keys.
  ```sh
  MSET key1 "value1" key2 "value2" key3 "value3"
  ```

### Number Operations
- **INCR key**: Increments the value of a key by 1.
  ```sh
  INCR mycounter
  ```
- **INCRBY key increment**: Increments the value of a key by a specified increment.
  ```sh
  INCRBY mycounter 5
  ```

### Bitwise Operations
- **GETBIT key offset**: Returns the bit value at the specified offset.
  ```sh
  GETBIT mykey 7
  ```
- **SETBIT key offset value**: Sets or clears the bit at the specified offset.
  ```sh
  SETBIT mykey 7 1
  ```
- **BITCOUNT key [start end]**: Counts the number of set bits (population counting) in a string.
  ```sh
  BITCOUNT mykey 0 7
  ```

### Performance
- **SUBSTR key start end**: Returns the substring of the string stored at a key.
  ```sh
  SUBSTR mykey 0 4
  ```
- **GETRANGE key start end**: Returns the substring of the string stored at a key (alias of SUBSTR).
  ```sh
  GETRANGE mykey 0 4
  ```
- **SETRANGE key offset value**: Overwrites part of the string stored at a key starting at the specified offset.
  ```sh
  SETRANGE mykey 6 "Redis"
  ```

## Lists

### Stack Operations
- **LPUSH key value1 [value2]**: Inserts values at the head of the list.
  ```sh
  LPUSH mylist "world"
  LPUSH mylist "hello"
  ```
- **RPUSH key value1 [value2]**: Inserts values at the tail of the list.
  ```sh
  RPUSH mylist "hello"
  RPUSH mylist "world"
  ```

### Queue Operations
- **LPOP key**: Removes and returns the first element of the list.
  ```sh
  LPOP mylist
  ```
- **RPOP key**: Removes and returns the last element of the list.
  ```sh
  RPOP mylist
  ```

### Blocking Commands
- **BLPOP key [key2 ...] timeout**: Removes and returns the first element of the list, or blocks until one is available.
  ```sh
  BLPOP mylist 0
  ```
- **BRPOP key [key2 ...] timeout**: Removes and returns the last element of the list, or blocks until one is available.
  ```sh
  BRPOP mylist 0
  ```
- **LRANGE key start stop**: Returns a range of elements from the list.
  ```sh
  LRANGE mylist 0 -1
  ```

### Miscellaneous
- **DEL key**: Deletes a key.
  ```sh
  DEL mykey
  ```

<details>
<summary>KEYS user:*</summary>
```sh
KEYS user:*
```
</details>

## Redis Sets

- **SADD key member1 [member2]**: Adds members to a set.
  ```sh
  SADD myset "Hello"
  ```
- **SREM key member1 [member2]**: Removes members from a set.
  ```sh
  SREM myset "Hello"
  ```
- **SISMEMBER key member**: Checks if a member exists in a set.
  ```sh
  SISMEMBER myset "Hello"
  ```
- **SMEMBERS key**: Returns all members of a set.
  ```sh
  SMEMBERS myset
  ```
- **SCARD key**: Gets the number of members in a set.
  ```sh
  SCARD myset
  ```

## Redis Hashes

- **HSET key field value**: Sets the value of a field in a hash.
  ```sh
  HSET myhash field1 "Hello"
  ```
- **HGET key field**: Gets the value of a field in a hash.
  ```sh
  HGET myhash field1
  ```
- **HMGET key field1 [field2]**: Gets the values of multiple fields in a hash.
  ```sh
  HMGET myhash field1 field2
  ```
- **HINCRBY key field increment**: Increments the value of a field in a hash by a specified increment.
  ```sh
  HINCRBY myhash field1 5
  ```

## Redis Sorted Sets

- **ZADD key score member [score member ...]**: Adds members to a sorted set, or updates the score if it already exists.
  ```sh
  ZADD myzset 1 "one"
  ```
- **ZRANGE key start stop [WITHSCORES]**: Returns a range of members in a sorted set, by index.
  ```sh
  ZRANGE myzset 0 -1
  ```
- **ZREVRANGE key start stop [WITHSCORES]**: Returns a range of members in a sorted set, by index, with scores ordered from high to low.
  ```sh
  ZREVRANGE myzset 0 -1
  ```

## Redis Streams

- **XADD key * field value [field value ...]**: Appends a new entry to a stream.
  ```sh
  XADD mystream * field1 "value1"
  ```
- **XREAD COUNT count STREAMS key [key ...] ID [ID ...]**: Reads data from one or multiple streams.
  ```sh
  XREAD COUNT 2 STREAMS mystream 0
  ```
- **XRANGE key start end [COUNT count]**: Returns a range of entries from a stream.
  ```sh
  XRANGE mystream - +
  ```
- **XLEN key**: Gets the length of a stream.
  ```sh
  XLEN mystream
  ```

## Redis Geospatial

- **GEOADD key longitude latitude member [longitude latitude member ...]**: Adds geospatial items (latitude, longitude, name) to a key.
  ```sh
  GEOADD mygeoset 13.361389 38.115556 "Palermo"
  ```
- **GEORADIUS key longitude latitude radius unit**: Queries a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
  ```sh
  GEORADIUS mygeoset 15 37 200 km
  ```

## Additional Commonly Used Commands

### Keys
- **EXISTS key**: Checks if a key exists.
  ```sh
  EXISTS mykey
  ```
- **EXPIRE key seconds**: Sets a timeout on a key.
  ```sh
  EXPIRE mykey 10
  ```
- **TTL key**: Gets the time to live for a key.
  ```sh
  TTL mykey
  ```

### Transactions
- **MULTI**: Marks the start of a transaction block.
  ```sh
  MULTI
  ```
- **EXEC**: Executes all commands issued after MULTI.
  ```sh
  EXEC
  ```
- **DISCARD**: Discards all commands issued after MULTI.
  ```sh
  DISCARD
  ```

### Pub/Sub
- **PUBLISH channel message**: Posts a message to a channel.
  ```sh
  PUBLISH mychannel "Hello, Redis!"
  ```
- **SUBSCRIBE channel [channel ...]**: Subscribes to a channel.
  ```sh
  SUBSCRIBE mychannel
  ```
- **UNSUBSCRIBE [channel ...]**: Unsubscribes from a channel.
  ```sh
  UNSUBSCRIBE mychannel
  ```
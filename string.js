const client = require("./client")

async function init() {
    // await client.set("user:5", "new_user") 
    await client.expire("user:5", 10)
    const result = await client.get("user:5")
    console.log('result', result)
}

init()
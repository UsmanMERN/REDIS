const express = require('express')
const axios = require('axios').default
const client = require('./client')

const app = express()

app.get('/', async (req, res) => {
    const cacheValue = await client.get("todos")
    if (cacheValue) return res.json(cacheValue)
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
    await client.set("todos", JSON.stringify(data))
    await client.expire("todos", 50)
    return res.json(data)
})

app.listen(9000)
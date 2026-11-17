const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json())

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}   )

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const express = require('express')
const app = express()
const cors = require('cors')
const notfoundMiddleware = require('./Src/Middleware/notFound.middleware')
const errorHandlerMiddleware = require('./Src/Middleware/errorHandler.middleware')





app.use(cors({
    origin: ['http://localhost:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(notfoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(express.json())

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}   )

app.get('/', (req, res) => {
    res.send('Hello World!')
})
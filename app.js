require('dotenv').config();
const express = require('express');


const app = express()
const port = process.env.API_PORT

const routes = require('./routes')

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use(express.json());
app.use(routes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
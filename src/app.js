require('dotenv').config({ path: '../.env' })

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo.route.js')
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(todoRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server listening on http://localhost:' + port)
})
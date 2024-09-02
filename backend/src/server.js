const express = require('express')
const { PORT } = require('./config/env/environment')

const app = express()

app.listen(PORT, () => {
    console.log(`Server Running 🚀 on port ${PORT}`)
})
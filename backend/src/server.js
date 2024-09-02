const app = require('./app')
const express = require('express')
const { PORT } = require('./config/env/environment')


app.listen(PORT, () => {
    console.log(`Server Running 🚀 on port ${PORT}`)
})
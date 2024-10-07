const app = require('./app');
const database = require('./config/database'); 
const { PORT } = require('./config/env/environment'); 

// Created by Matheus de Amorim Favero
// Unisagrado 2024

database.open()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log('Error starting server:', error);
  });

const express = require('express');
const app = express();

// Render asigna un puerto automáticamente a través de las variables de entorno.
// Si no existe, usamos el puerto 10000 por defecto.
const PORT = process.env.PORT || 10000;

// Esta es la ruta principal. Cuando alguien entre a tu página, verá este mensaje.
app.get('/', (req, res) => {
  res.send('<h1>¡Hola! Bienvenidos a LLAWeb 🚀</h1><p>La futura página del colegio está en construcción.</p>');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});

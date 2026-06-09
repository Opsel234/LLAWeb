const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Esto le dice a Node que cualquier archivo HTML, CSS o juego 
// que metas dentro de una carpeta llamada "public", se verá en internet.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

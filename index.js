const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// ESTRUCTURA BASE HTML (Para no repetir código)
function generarPagina(titulo, contenido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo} - LLAWeb</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #121212; color: white; text-align: center; padding: 40px; margin: 0; }
            h1 { color: #8a2be2; margin-bottom: 10px; }
            p { color: #bbb; font-size: 18px; }
            .menu { display: flex; justify-content: center; gap: 15px; margin-top: 20px; margin-bottom: 40px; flex-wrap: wrap; }
            .boton { background-color: #1e1e1e; border: 2px solid #8a2be2; color: white; padding: 12px 24px; font-size: 15px; cursor: pointer; border-radius: 8px; text-decoration: none; transition: 0.3s; }
            .boton:hover { background-color: #8a2be2; transform: scale(1.05); }
            .btn-home { border-color: #00ffcc; color: #00ffcc; }
            .btn-home:hover { background-color: #00ffcc; color: black; }
            .contenedor-seccion { background-color: #1a1a1a; border-radius: 12px; padding: 30px; max-width: 800px; margin: 0 auto; border: 1px solid #333; }
        </style>
    </head>
    <body>
        <h1>🎮 LLAWeb 🚀</h1>
        
        <div class="menu">
            <a href="/" class="boton btn-home">🏠 Inicio</a>
            <a href="/musica" class="boton">📺 Música</a>
            <a href="/juegos" class="boton">🕹️ Juegos Gratis</a>
            <a href="/pdf" class="boton">📄 Convertidor PDF</a>
            <a href="/promos" class="boton">📢 Promociones</a>
        </div>

        <div class="contenedor-seccion">
            ${contenido}
        </div>
    </body>
    </html>
  `;
}

// 1. RUTA DE INICIO
app.get('/', (req, res) => {
  res.send(generarPagina('Inicio', `
    <h2>¡Bienvenidos a la plataforma oficial del colegio!</h2>
    <p>Selecciona cualquiera de las secciones de arriba para empezar a navegar.</p>
  `));
});

// 2. RUTA DE MÚSICA
app.get('/musica', (req, res) => {
  res.send(generarPagina('Música', `
    <h2>📺 YouTube y Música sin Anuncios</h2>
    <p>Aquí pondremos nuestro reproductor limpio. (Sección en desarrollo)</p>
  `));
});

// 3. RUTA DE JUEGOS
app.get('/juegos', (req, res) => {
  res.send(generarPagina('Juegos', `
    <h2>🕹️ Zona de Juegos Gratis</h2>
    <p>Prepárate para la Palo Store de juegos HTML5. (Sección en desarrollo)</p>
  `));
});

// 4. RUTA DE PDF
app.get('/pdf', (req, res) => {
  res.send(generarPagina('Convertidor PDF', `
    <h2>📄 Convertidor de Archivos</h2>
    <p>Herramientas rápidas para tus tareas del colegio. (Sección en desarrollo)</p>
  `));
});

// 5. RUTA DE PROMOS
app.get('/promos', (req, res) => {
  res.send(generarPagina('Promociones', `
    <h2>📢 Muro de Promociones</h2>
    <p>Eventos, alianzas y anuncios importantes del colegio. (Sección en desarrollo)</p>
  `));
});

app.listen(PORT, () => {
  console.log(`Servidor ordenado corriendo en el puerto ${PORT}`);
});

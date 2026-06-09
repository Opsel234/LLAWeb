const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

function generarPaginaCompleta() {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LLAWeb - Sistema Escolar</title>
        <style>
            body { font-family: 'Courier New', Courier, monospace; background-color: #050505; color: #00ff00; margin: 0; padding: 0; overflow: hidden; width: 100vw; height: 100vh; }
            #pantalla-inicio { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000; z-index: 10000; display: flex; justify-content: center; align-items: center; }
            .btn-encender { background-color: #050505; border: 2px solid #00ff00; color: #00ff00; padding: 20px 40px; font-size: 20px; font-family: inherit; cursor: pointer; border-radius: 6px; box-shadow: 0 0 10px rgba(0, 255, 0, 0.3); transition: 0.3s; }
            .btn-encender:hover { background-color: #00ff00; color: #000; box-shadow: 0 0 25px #00ff00; }
            #terminal-login { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #0a0a0a; z-index: 9999; display: none; flex-direction: column; justify-content: flex-start; box-sizing: border-box; padding: 30px; overflow-y: auto; }
            .consola-caja { width: 100%; max-width: 900px; margin: 0 auto; }
            .log-linea { display: flex; font-size: 16px; line-height: 24px; margin-bottom: 4px; }
            .log-timestamp { color: #666; width: 110px; flex-shrink: 0; user-select: none; }
            .log-mensaje { color: #00ff00; white-space: pre-wrap; }
            .log-info { color: #00bfff; }
            .input-linea { display: flex; align-items: center; margin-top: 15px; }
            .prompt { color: #00ff00; font-weight: bold; margin-right: 10px; flex-shrink: 0; }
            .input-linea input { background: transparent; border: none; color: #fff; font-family: inherit; font-size: 16px; outline: none; width: 100%; caret-color: #00ff00; }
            #contenido-principal { display: none; padding: 40px 20px; text-align: center; overflow-y: auto; height: 100vh; box-sizing: border-box; }
            h1 { color: #8a2be2; text-shadow: 0 0 10px #8a2be2; }
            h2 { color: #00ffcc; }
            .menu { display: flex; justify-content: center; gap: 15px; margin-top: 20px; margin-bottom: 40px; flex-wrap: wrap; }
            .boton { background-color: #111; border: 2px solid #8a2be2; color: white; padding: 12px 24px; font-size: 15px; cursor: pointer; border-radius: 8px; text-decoration: none; transition: 0.3s; font-family: sans-serif; }
            .boton:hover { background-color: #8a2be2; color: white; transform: scale(1.05); box-shadow: 0 0 15px #8a2be2; }
            .btn-home { border-color: #00ffcc; color: #00ffcc; }
            .btn-home:hover { background-color: #00ffcc; color: black; box-shadow: 0 0 15px #00ffcc; }
            .contenedor-seccion { background-color: #111; border-radius: 12px; padding: 30px; max-width: 800px; margin: 0 auto; border: 1px solid #333; }
            .usuario-activo { font-size: 16px; color: #00ffcc; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <div id="pantalla-inicio">
            <button class="btn-encender" id="btn-start">⚡ Iniciar Sistema ⚡</button>
        </div>
        <div id="terminal-login">
            <div class="consola-caja" id="consola-historial"></div>
            <div class="consola-caja" id="caja-input" style="display: none;">
                <div class="input-linea">
                    <span class="prompt">llaweb@system:~$</span>
                    <input type="text" id="nickname-input" autocomplete="off" placeholder="ingresa_tu_nombre...">
                </div>
            </div>
        </div>
        <div id="contenido-principal">
            <h1>🎮 LLAWeb 🚀</h1>
            <div class="usuario-activo" id="mostrar-usuario"></div>
            <div class="menu">
                <a href="/" class="boton btn-home">🏠 Inicio</a>
                <a href="/musica" class="boton">📺 Música</a>
                <a href="/juegos" class="boton">🕹️ Juegos Gratis</a>
                <a href="/pdf" class="boton">📄 Convertidor PDF</a>
                <a href="/promos" class="boton">📢 Promociones</a>
            </div>
            <div class="contenedor-seccion">
                <h2>¡Bienvenido al panel principal!</h2>
                <p>Navega usando los botones de arriba para explorar las herramientas.</p>
            </div>
        </div>
        <script>
            const pInicio = document.getElementById('pantalla-inicio');
            const terminal = document.getElementById('terminal-login');
            const principal = document.getElementById('contenido-principal');
            const btnStart = document.getElementById('btn-start');
            const inputName = document.getElementById('nickname-input');
            const mostrarUser = document.getElementById('mostrar-usuario');
            const historial = document.getElementById('consola-historial');
            const cajaInput = document.getElementById('caja-input');
            const usuarioGuardado = localStorage.getItem('llaweb_username');

            function obtenerHora() {
                const ahora = new Date();
                return ahora.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            }

            function agregarLog(mensaje, esInfo = false) {
                const linea = document.createElement('div');
                linea.className = 'log-linea';
                const claseMensaje = esInfo ? 'log-mensaje log-info' : 'log-mensaje';
                linea.innerHTML = '<span class="log-timestamp">' + obtenerHora() + '</span><span class="' + claseMensaje + '">' + mensaje + '</span>';
                historial.appendChild(linea);
            }

            btnStart.addEventListener('click', function() {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch(() => {});
                }
                pInicio.style.display = 'none';
                if (usuarioGuardado) {
                    principal.style.display = 'block';
                    mostrarUser.innerText = '💻 Agente Activo: ' + usuarioGuardado;
                } else {
                    terminal.style.display = 'flex';
                    setTimeout(() => agregarLog('==> Cloning from github.com/omnnin/LLA_Web...'), 200);
                    setTimeout(() => agregarLog('==> Checking out commit for production setup...'), 700);
                    setTimeout(() => agregarLog('==> Using Node.js environment successfully.'), 1200);
                    setTimeout(() => agregarLog('==> Running system initialization command...', true), 1700);
                    setTimeout(() => agregarLog('==> LLAWeb server successfully started on port 10000.'), 2200);
                    setTimeout(() => agregarLog('==> YOUR SERVICE IS LIVE 🚀', true), 2500);
                    setTimeout(() => {
                        agregarLog('==> Por favor, introduce tus credenciales para continuar:');
                        cajaInput.style.display = 'block';
                        inputName.focus();
                    }, 3000);
                }
            });

            inputName.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && inputName.value.trim() !== '') {
                    const nombreUsuario = inputName.value.trim();
                    localStorage.setItem('llaweb_username', nombreUsuario);
                    terminal.style.display = 'none';
                    principal.style.display = 'block';
                    mostrarUser.innerText = '💻 Agente Activo: ' + nombreUsuario;
                }
            });
        </script>
    </body>
    </html>
  `;
}

app.get('/', (req, res) => { res.send(generarPaginaCompleta()); });
app.get('/musica', (req, res) => { res.send(generarPaginaCompleta()); });
app.get('/juegos', (req, res) => { res.send(generarPaginaCompleta()); });
app.get('/pdf', (req, res) => { res.send(generarPaginaCompleta()); });
app.get('/promos', (req, res) => { res.send(generarPaginaCompleta()); });

app.listen(PORT, () => {
  console.log(`Servidor estable corriendo en el puerto ${PORT}`);
});

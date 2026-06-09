const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Servir archivos estáticos (aquí le decimos que busque el CSS en la raíz o carpetas)
app.use(express.static(__dirname));

function generarPaginaCompleta() {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LLAWeb - Sistema Escolar</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <svg width="0" height="0" style="position:absolute">
          <filter id="chromatic-aberration">
            <feOffset in="SourceGraphic" dx="1.5" dy="0" result="red"/>
            <feOffset in="SourceGraphic" dx="-1.5" dy="0" result="blue"/>
            <feColorMatrix in="red" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redMatrix"/>
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="greenMatrix"/>
            <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueMatrix"/>
            <feBlend in="redMatrix" in2="greenMatrix" mode="screen" result="rb"/>
            <feBlend in="rb" in2="blueMatrix" mode="screen"/>
          </filter>
        </svg>

        <div id="pantalla-inicio">
            <button class="btn-encender" id="btn-start">⚡ ENTER LOBBY ⚡</button>
        </div>
        <div id="terminal-login">
            <div class="consola-caja" id="consola-historial"></div>
            <div class="consola-caja" id="caja-input" style="display: none;">
                <div class="input-linea">
                    <span class="prompt">ENTER NICKNAME ></span>
                    <input type="text" id="nickname-input" autocomplete="off" maxlength="15">
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

            function agregarLog(mensaje) {
                const linea = document.createElement('div');
                linea.className = 'log-linea';
                linea.innerText = mensaje;
                historial.appendChild(linea);
                terminal.scrollTop = terminal.scrollHeight;
                return linea;
            }

            btnStart.addEventListener('click', function() {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch(() => {});
                }
                pInicio.style.display = 'none';
                terminal.style.display = 'flex';
                historial.innerHTML = '';
                
                setTimeout(() => agregarLog('NONE Standard Electronics'), 50);
                setTimeout(() => agregarLog('Personal Computer Model - 98A'), 150);
                setTimeout(() => agregarLog('\\nU-Boot 2020.10-rc2-00109-g28cd2a1bc7 (Jan 10 2026 - 18:23:41 -0400)'), 400);
                setTimeout(() => agregarLog('\\nDRAM: 128MiB'), 700);
                setTimeout(() => agregarLog('MMC:   sdhci@01c28000: 0'), 850);
                setTimeout(() => agregarLog('Loading default environment'), 1000);
                setTimeout(() => agregarLog('\\nIn:    serial                       [##########]'), 1300);
                setTimeout(() => agregarLog('Out:   serial                       [##########]'), 1450);
                setTimeout(() => agregarLog('Err:   serial                       [##########]'), 1600);
                setTimeout(() => agregarLog('SYSTEM: Mesh connection found.'), 1900);
                setTimeout(() => agregarLog('IDE:   Bus 0: not available'), 2050);
                setTimeout(() => agregarLog('\\nHit any key to stop autoboot: 0'), 2450);
                setTimeout(() => agregarLog('reading uboot.env...'), 2600);
                setTimeout(() => agregarLog('FAST: Misaligned buffer address (007dfc10/007dfc40)'), 2700);
                setTimeout(() => agregarLog('6215 bytes read in 19 ms (319.3 KiB/s)'), 2850);
                setTimeout(() => agregarLog('reading u-boot.img...'), 3000);
                setTimeout(() => agregarLog('FAST: Misaligned buffer address (007dfc10/007dfc40)'), 3100);
                setTimeout(() => agregarLog('368940 bytes read in 178ms (2 MiB/s)'), 3250);
                setTimeout(() => agregarLog('Setting up image ID - 45227801'), 3400);
                setTimeout(() => {
                    agregarLog('\\n== Flattened Device Tree blob at 00aa0000');
                    agregarLog('## Booting os using the FDT blob at 00aa0000...');
                }, 3700);

                setTimeout(() => {
                    cajaInput.style.display = 'block';
                    inputName.focus();
                }, 4300);
            });

            inputName.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && inputName.value.trim() !== '') {
                    const nombreUsuario = inputName.value.trim().toUpperCase();
                    terminal.style.display = 'none';
                    principal.style.display = 'block';
                    mostrarUser.innerText = '💻 USER: ' + nombreUsuario;
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
  console.log(`Servidor limpio corriendo en puerto ${PORT}`);
});

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
            body { font-family: 'Courier New', Courier, monospace; background-color: #000000; color: #00ff00; margin: 0; padding: 0; overflow: hidden; width: 100vw; height: 100vh; }
            #pantalla-inicio { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000; z-index: 10000; display: flex; justify-content: center; align-items: center; }
            .btn-encender { background-color: #000; border: 2px solid #00ff00; color: #00ff00; padding: 20px 40px; font-size: 20px; font-family: inherit; cursor: pointer; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 255, 0, 0.2); transition: 0.3s; }
            .btn-encender:hover { background-color: #00ff00; color: #000; box-shadow: 0 0 25px #00ff00; }
            
            #terminal-login { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000000; z-index: 9999; display: none; flex-direction: column; justify-content: flex-start; box-sizing: border-box; padding: 40px; overflow-y: auto; }
            .consola-caja { width: 100%; max-width: 900px; margin: 0 auto; text-transform: uppercase; }
            .log-linea { font-size: 15px; line-height: 22px; margin-bottom: 2px; white-space: pre-wrap; font-weight: bold; text-shadow: 0 0 3px rgba(0, 255, 0, 0.5); }
            
            .input-linea { display: flex; align-items: center; margin-top: 25px; }
            .prompt { color: #00ff00; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
            .input-linea input { background: transparent; border: none; color: #00ff00; font-family: inherit; font-size: 16px; outline: none; width: 100%; caret-color: #00ff00; text-transform: uppercase; font-weight: bold; }
            
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
            const usuarioGuardado = localStorage.getItem('llaweb_username');

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
                if (usuarioGuardado) {
                    principal.style.display = 'block';
                    mostrarUser.innerText = '💻 USER: ' + usuarioGuardado;
                } else {
                    terminal.style.display = 'flex';
                    
                    // --- SECUENCIA EXACTA ESTILO BUCKSHOT ROULETTE ---
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

                    // Aparece el input para poner el nombre de jugador
                    setTimeout(() => {
                        cajaInput.style.display = 'block';
                        inputName.focus();
                    }, 4300);
                }
            });

            inputName.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && inputName.value.trim() !== '') {
                    const nombreUsuario = inputName.value.trim().toUpperCase();
                    localStorage.setItem('llaweb_username', nombreUsuario);
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
  console.log(`Servidor Buckshot Roulette corriendo en el puerto ${PORT}`);
});

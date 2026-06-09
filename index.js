const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Servir archivos estáticos como el style.cs
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
        <div id="bloqueo-google">
            <div class="alerta-roja">🛑 ACCESO RESTRINGIDO 🛑</div>
            <p class="log-linea">Para ingresar al sistema debes verificar tu identidad.</p>
            <p class="subtexto-google">Este lobby requiere una cuenta escolar o personal de Google vinculada.</p>
            
            <button class="btn-google" id="btn-login-google">
                <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/web-24dp/logo_googleg_color_web_24dp.png" alt="Google">
                Iniciar sesión con Google
            </button>
        </div>

        <div id="pantalla-inicio" style="display: none;">
            <button class="btn-encender" id="btn-start">⚡ ENTER LOBBY ⚡</button>
        </div>

        <div id="terminal-login" style="display: none;">
            <div class="consola-caja" id="consola-historial"></div>
            <div class="consola-caja" id="caja-input" style="display: none;">
                <div class="input-linea">
                    <span class="prompt">ENTER NICKNAME ></span>
                    <input type="text" id="nickname-input" autocomplete="off" maxlength="15">
                </div>
            </div>
        </div>

        <div id="contenido-principal" style="display: none;">
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
            const pGoogle = document.getElementById('bloqueo-google');
            const btnGoogle = document.getElementById('btn-login-google');
            
            const pInicio = document.getElementById('pantalla-inicio');
            const terminal = document.getElementById('terminal-login');
            const principal = document.getElementById('contenido-principal');
            const btnStart = document.getElementById('btn-start');
            const inputName = document.getElementById('nickname-input');
            const mostrarUser = document.getElementById('mostrar-usuario');
            const historial = document.getElementById('consola-historial');
            const cajaInput = document.getElementById('caja-input');

            // --- SIMULACIÓN DE LOGIN DE GOOGLE ---
            btnGoogle.addEventListener('click', function() {
                btnGoogle.innerText = "Conectando con Google...";
                btnGoogle.disabled = true;

                const ancho = 500, alto = 600;
                const izquierda = (screen.width / 2) - (ancho / 2);
                const arriba = (screen.height / 2) - (alto / 2);
                
                // Abrimos la ventana falsa
                const popup = window.open(
                    'about:blank', 
                    'GoogleAuth', 
                    'width=' + ancho + ',height=' + alto + ',top=' + arriba + ',left=' + izquierda + ',scrollbars=no,resizable=no'
                );

                // Insertamos el diseño interno usando comillas normales para evitar que falle Node
                popup.document.write(
                    '<html>' +
                    '<head><title>Iniciando sesión con Google</title></head>' +
                    '<body style="font-family:sans-serif; text-align:center; padding-top:80px; background:#f8f9fa; color:#3c4043;">' +
                        '<img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/web-24dp/logo_googleg_color_web_24dp.png" style="width:48px;">' +
                        '<h2>Iniciando sesión</h2>' +
                        '<p style="color:#5f6368;font-size:14px;">Vinculando cuenta con LLAWeb...</p>' +
                        '<div style="margin:40px auto; width:30px; height:30px; border:4px solid #f3f3f3; border-top:4px solid #4285f4; border-radius:50%; animation:spin 1s linear infinite;"></div>' +
                        '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>' +
                    '</body>' +
                    '</html>'
                );

                // Esperamos 2.5 segundos, cerramos popup y damos paso a la BIOS
                setTimeout(function() {
                    if (popup) popup.close();
                    pGoogle.style.display = 'none';
                    pInicio.style.display = 'flex';
                }, 2500);
            });

            // --- LÓGICA DE LA BIOS BUCKSHOT ROULETTE ---
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
                    document.documentElement.requestFullscreen().catch(function() {});
                }
                pInicio.style.display = 'none';
                terminal.style.display = 'flex';
                historial.innerHTML = '';
                
                setTimeout(function() { agregarLog('NONE Standard Electronics'); }, 50);
                setTimeout(function() { agregarLog('Personal Computer Model - 98A'); }, 150);
                setTimeout(function() { agregarLog('\\nU-Boot 2020.10-rc2-00109-g28cd2a1bc7 (Jan 10 2026 - 18:23:41 -0400)'); }, 400);
                setTimeout(function() { agregarLog('\\nDRAM: 128MiB'); }, 700);
                setTimeout(function() { agregarLog('MMC:   sdhci@01c28000: 0'); }, 850);
                setTimeout(function() { agregarLog('Loading default environment'); }, 1000);
                setTimeout(function() { agregarLog('\\nIn:    serial                       [##########]'); }, 1300);
                setTimeout(function() { agregarLog('Out:   serial                       [##########]'); }, 1450);
                setTimeout(function() { agregarLog('Err:   serial                       [##########]'); }, 1600);
                setTimeout(function() { agregarLog('SYSTEM: Mesh connection found.'); }, 1900);
                setTimeout(function() { agregarLog('IDE:   Bus 0: not available'); }, 2050);
                setTimeout(function() { agregarLog('\\nHit any key to stop autoboot: 0'); }, 2450);
                setTimeout(function() { agregarLog('reading uboot.env...'); }, 2600);
                setTimeout(function() { agregarLog('FAST: Misaligned buffer address (007dfc10/007dfc40)'); }, 2700);
                setTimeout(function() { agregarLog('6215 bytes read in 19 ms (319.3 KiB/s)'); }, 2850);
                setTimeout(function() { agregarLog('reading u-boot.img...'); }, 3000);
                setTimeout(function() { agregarLog('FAST: Misaligned buffer address (007dfc10/007dfc40)'); }, 3100);
                setTimeout(function() { agregarLog('368940 bytes read in 178ms (2 MiB/s)'); }, 3250);
                setTimeout(function() { agregarLog('Setting up image ID - 45227801'); }, 3400);
                setTimeout(function() {
                    agregarLog('\\n== Flattened Device Tree blob at 00aa0000');
                    agregarLog('## Booting os using the FDT blob at 00aa0000...');
                }, 3700);

                setTimeout(function() {
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
  console.log(`Servidor seguro encendido en el puerto ${PORT}`);
});

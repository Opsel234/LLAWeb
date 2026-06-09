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
            body { 
                font-family: 'Courier New', Courier, monospace; 
                background-color: #000; 
                color: #00ff00; 
                margin: 0; 
                padding: 0;
                overflow: hidden;
                width: 100vw;
                height: 100vh;
            }

            /* 1. PANTALLA DEL BOTÓN INICIAL */
            #pantalla-inicio {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background-color: #000;
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .btn-encender {
                background-color: #000;
                border: 3px solid #00ff00;
                color: #00ff00;
                padding: 25px 50px;
                font-size: 22px;
                font-family: inherit;
                font-weight: bold;
                cursor: pointer;
                border-radius: 10px;
                box-shadow: 0 0 15px #00ff00;
                transition: 0.3s;
                text-transform: uppercase;
            }
            .btn-encender:hover {
                background-color: #00ff00;
                color: #000;
                box-shadow: 0 0 30px #00ff00;
            }

            /* 2. PANTALLA DE LA TERMINAL HACKER */
            #terminal-login {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background-color: #000;
                z-index: 9999;
                display: none; /* Oculto al principio */
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 20px;
            }
            .consola-caja {
                text-align: left;
                width: 100%;
                max-width: 600px;
            }
            .linea-consola {
                font-size: 18px;
                margin-bottom: 10px;
                text-shadow: 0 0 5px #00ff00;
            }
            .input-linea {
                display: flex;
                align-items: center;
                font-size: 20px;
                margin-top: 20px;
            }
            .input-linea input {
                background: transparent;
                border: none;
                color: #00ff00;
                font-family: inherit;
                font-size: 20px;
                outline: none;
                width: 100%;
                padding-left: 10px;
                text-shadow: 0 0 5px #00ff00;
            }

            /* 3. INTERFAZ PRINCIPAL (Oculta al principio) */
            #contenido-principal {
                display: none;
                padding: 40px 20px;
                text-align: center;
                overflow-y: auto;
                height: 100vh;
                box-sizing: border-box;
            }
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
            <div class="consola-caja">
                <div class="linea-consola" id="log-tiempo"></div>
                <div class="linea-consola">==> SYSTEM READY...</div>
                <div class="linea-consola">==> POR FAVOR, INGRESA TU USUARIO PERMANENTE:</div>
                <div class="input-linea">
                    <span>LLAWeb_root@user:~$</span>
                    <input type="text" id="nickname-input" autocomplete="off" placeholder="tu_nombre...">
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

            // Actualizar reloj de la terminal
            const ahora = new Date();
            document.getElementById('log-tiempo').innerText = '[' + ahora.toLocaleTimeString() + '] starting system...';

            // REVISAR SI EL USUARIO YA EXISTE
            const usuarioGuardado = localStorage.getItem('llaweb_username');

            // Evento al presionar "Iniciar Sistema"
            btnStart.addEventListener('click', function() {
                // Activar pantalla completa real
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen().catch(() => {});
                }

                pInicio.style.display = 'none'; // Quitar pantalla del botón

                if (usuarioGuardado) {
                    // Si ya tiene usuario, va directo al grano
                    principal.style.display = 'block';
                    mostrarUser.innerText = '💻 Agente Activo: ' + usuarioGuardado;
                } else {
                    // Si es nuevo, abre la terminal hacker
                    terminal.style.display = 'flex';
                    inputName.focus(); // Pone el cursor listo para escribir
                }
            });

            // Registrar usuario al presionar Enter en la terminal
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
  console.log(`Servidor con botón de inicio corriendo en el puerto ${PORT}`);
});

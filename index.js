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
                background-color: #050505; 
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
                background-color: #050505;
                border: 2px solid #00ff00;
                color: #00ff00;
                padding: 20px 40px;
                font-size: 20px;
                font-family: inherit;
                cursor: pointer;
                border-radius: 6px;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
                transition: 0.3s;
            }
            .btn-encender:hover {
                background-color: #00ff00;
                color: #000;
                box-shadow: 0 0 25px #00ff00;
            }

            /* 2. PANTALLA DE LA TERMINAL ESTILO RENDER */
            #terminal-login {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background-color: #0a0a0a;
                z-index: 9999;
                display: none;
                flex-direction: column;
                justify-content: flex-start;
                box-sizing: border-box;
                padding: 30px;
                overflow-y: auto;
            }
            .consola-caja {
                width: 100%;
                max-width: 900px;
                margin: 0 auto;
            }
            
            /* Formato de logs ordenados en columnas estilo Render */
            .log-linea {
                display: flex;
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 4px;
            }
            .log-timestamp {
                color: #666;
                width: 110px;
                flex-shrink: 0;
                user-select: none;
            }
            .log-mensaje {
                color: #00ff00;
                white-space: pre-wrap;
            }
            .log-info {
                color: #00bfff; /* Color azul para indicar comandos */
            }

            /* Línea de comandos para el Input */
            .input-linea {
                display: flex;
                align-items: center;
                margin-top: 15px;
            }
            .prompt {
                color: #00ff00;
                font-weight: bold;
                margin-right: 10px;
                flex-shrink: 0;
            }
            .input-linea input {
                background: transparent;
                border: none;
                color: #fff;
                font-family: inherit;
                font-size: 16px;
                outline: none;
                width: 100%;
                caret-color: #00ff00; /* Cursor parpadeante */
            }

            /* 3. INTERFAZ PRINCIPAL */
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
            <button class="btn-encender" id="btn-start">Iniciar Sistema</button>
        </div>

        <div id="terminal-login">
            <div class="consola-caja" id="consola-historial">
                </div>
            
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

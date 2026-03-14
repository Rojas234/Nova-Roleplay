/**
 * LÓGICA DE NAVEGACIÓN (Cambio entre Inicio y Staff)
 */
function mostrarSeccion(id) {
    // 1. Buscamos todas las secciones con la clase 'content-section'
    const secciones = document.querySelectorAll('.content-section');
    
    // 2. Quitamos la clase 'active' de todas para ocultarlas
    secciones.forEach(s => s.classList.remove('active'));

    // 3. Mostramos la sección que el usuario seleccionó
    const seleccionada = document.getElementById('seccion-' + id);
    if (seleccionada) {
        seleccionada.classList.add('active');
        // Esto hace que la página suba al inicio suavemente al cambiar
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * LÓGICA DE ESTADO DEL SERVIDOR (IP: 135.148.164.122)
 * Se usan múltiples APIs para garantizar que siempre muestre el estado real.
 */
const IP_SERVIDOR = "135.148.164.122"; 
const PUERTO_SERVIDOR = "30498";

async function obtenerEstado() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    // Ponemos un mensaje de "Cargando" breve para que el usuario sepa que está consultando
    if (infoTexto.innerText === "Consultando...") {
        infoTexto.innerText = "Sincronizando...";
    }

    try {
        // INTENTO 1: API de Open.mp (Suele ser la más rápida para detectar cambios de Query)
        const res1 = await fetch(`https://api.open.mp/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
        const datos1 = await res1.json();
        
        if (datos1 && datos1.Players !== undefined) {
            infoTexto.innerText = `Jugadores: ${datos1.Players} / ${datos1.MaxPlayers}`;
            puntoEstado.style.backgroundColor = "#22c55e";
            puntoEstado.style.boxShadow = "0 0 15px #22c55e";
            return; // Si funciona, salimos de la función aquí
        } else {
            throw new Error("Open.mp falló");
        }

    } catch (error) {
        try {
            // INTENTO 2: API de SAMP-Servers (Respaldo)
            const res2 = await fetch(`https://api.samp-servers.net/v2/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
            const datos2 = await res2.json();

            if (datos2 && datos2.core && datos2.core.online) {
                infoTexto.innerText = `Jugadores: ${datos2.core.players} / ${datos2.core.maxplayers}`;
                puntoEstado.style.backgroundColor = "#22c55e";
                puntoEstado.style.boxShadow = "0 0 15px #22c55e";
            } else {
                throw new Error("SAMP-Servers falló");
            }

        } catch (e) {
            // SI AMBAS FALLAN: El servidor está offline o el Query 1 no ha propagado
            infoTexto.innerText = "Servidor Offline";
            puntoEstado.style.backgroundColor = "#ef4444";
            puntoEstado.style.boxShadow = "0 0 15px #ef4444";
        }
    }
}

// Ejecutar la primera vez al cargar la página
obtenerEstado();

// Actualizar automáticamente cada 20 segundos (un poco más rápido para evitar que el usuario vea datos viejos)
setInterval(obtenerEstado, 20000);

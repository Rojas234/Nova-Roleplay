/**
 * LÓGICA DE NAVEGACIÓN
 */
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(s => s.classList.remove('active'));
    const seleccionada = document.getElementById('seccion-' + id);
    if (seleccionada) {
        seleccionada.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * LÓGICA DE ESTADO - SOLUCIÓN FORZADA
 */
const IP_SERVIDOR = "135.148.164.122"; 
const PUERTO_SERVIDOR = "30498";

async function obtenerEstado() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    try {
        // Usamos un proxy (allorigins) para evitar que el navegador bloquee la petición
        // Esto ayuda a saltar bloqueos de seguridad que hacen que salga "Offline"
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetUrl = encodeURIComponent(`https://api.samp-servers.net/v2/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
        
        const respuesta = await fetch(proxyUrl + targetUrl);
        const json = await respuesta.json();
        
        // El proxy devuelve los datos dentro de una propiedad "contents" en formato texto
        const datos = JSON.parse(json.contents);

        if (datos && datos.core && datos.core.online) {
            infoTexto.innerText = `Jugadores: ${datos.core.players} / ${datos.core.maxplayers}`;
            puntoEstado.style.backgroundColor = "#22c55e";
            puntoEstado.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error();
        }
    } catch (error) {
        // Segundo intento con API de respaldo directa
        try {
            const res2 = await fetch(`https://api.open.mp/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
            const datos2 = await res2.json();
            
            if (datos2 && datos2.Players !== undefined) {
                infoTexto.innerText = `Jugadores: ${datos2.Players} / ${datos2.MaxPlayers}`;
                puntoEstado.style.backgroundColor = "#22c55e";
                puntoEstado.style.boxShadow = "0 0 15px #22c55e";
            } else {
                infoTexto.innerText = "Servidor Abierto (Sync...)"; // Mensaje si el sv está prendido pero la API falla
                puntoEstado.style.backgroundColor = "#eab308"; // Color amarillo (sincronizando)
            }
        } catch (e) {
            infoTexto.innerText = "Servidor Offline";
            puntoEstado.style.backgroundColor = "#ef4444";
        }
    }
}

obtenerEstado();
setInterval(obtenerEstado, 20000);

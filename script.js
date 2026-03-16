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
 * LÓGICA DE ESTADO DEL SERVIDOR (IP: 142.132.203.47:30858)
 */
async function actualizarEstado() {
    const info = document.getElementById('player-info');
    const dot = document.getElementById('status-dot');

    if (!info || !dot) return;

    // Datos del servidor
    const ip = "142.132.203.47";
    const puerto = "30858";

    try {
        // Usamos AllOrigins para evitar errores de CORS y problemas de DNS (ERR_NAME_NOT_RESOLVED)
        // Agregamos un número aleatorio al final (&rand=...) para romper el caché del navegador
        const urlAPI = `https://api.samp-api.com/v1/server/${ip}/${puerto}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlAPI)}&rand=${Math.random()}`;

        const res = await fetch(proxyUrl);
        
        if (!res.ok) throw new Error("Error al conectar con el proxy");

        const json = await res.json();
        
        // El contenido real viene como texto dentro de json.contents
        if (!json.contents) throw new Error("Sin respuesta del servidor");
        
        const data = JSON.parse(json.contents);

        if (data && data.players !== undefined) {
            info.innerText = `Online: ${data.players} / ${data.maxPlayers}`;
            info.style.color = "#22c55e"; // Verde
            dot.style.backgroundColor = "#22c55e";
            dot.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error("Datos de servidor no encontrados");
        }
    } catch (e) {
        console.error("Error en la actualización:", e);
        // Si falla la API, mostramos Offline
        info.innerText = "Servidor Offline";
        info.style.color = "#ef4444"; // Rojo
        dot.style.backgroundColor = "#ef4444";
        dot.style.boxShadow = "none";
    }
}

// Ejecutar inmediatamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarEstado();
    // Refrescar cada 30 segundos
    setInterval(actualizarEstado, 30000);
});

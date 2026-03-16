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
 * LÓGICA DE ESTADO (IP NUEVA: 142.132.203.47:30858)
 */
const IP_NUEVA = "142.132.203.47";
const PUERTO_NUEVO = "30858";

async function actualizarEstado() {
    const info = document.getElementById('player-info');
    const dot = document.getElementById('status-dot');

    if (!info || !dot) return;

    try {
        // URL pre-construida para evitar cualquier error de sintaxis en el navegador
        const urlFinal = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.samp-api.com/v1/server/142.132.203.47/30858");
        
        const res = await fetch(urlFinal);
        
        if (!res.ok) throw new Error("Proxy Error");

        const json = await res.json();
        
        if (json && json.contents) {
            const data = JSON.parse(json.contents);

            if (data && data.players !== undefined) {
                info.innerText = "Online: " + data.players + " / " + data.maxPlayers;
                info.style.color = "#22c55e";
                dot.style.backgroundColor = "#22c55e";
                dot.style.boxShadow = "0 0 15px #22c55e";
            } else {
                throw new Error("Invalid Data");
            }
        }
    } catch (e) {
        console.error("Error detallado:", e);
        info.innerText = "Servidor Offline";
        info.style.color = "#ef4444";
        dot.style.backgroundColor = "#ef4444";
        dot.style.boxShadow = "none";
    }
}

// Ejecutar al cargar
actualizarEstado();
// Actualizar cada 20 segundos
setInterval(actualizarEstado, 20000);

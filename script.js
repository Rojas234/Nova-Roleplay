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

    // Tu IP y Puerto
    const ip = "142.132.203.47";
    const puerto = "30858";

    try {
        // Usamos la API de samp-api directamente (sin proxy para ver si quita el 400)
        const res = await fetch('https://api.samp-api.com/v1/server/' + ip + '/' + puerto);
        
        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();

        if (data && data.players !== undefined) {
            info.innerText = "Online: " + data.players + " / " + data.maxPlayers;
            info.style.color = "#22c55e";
            dot.style.backgroundColor = "#22c55e";
            dot.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error("Datos no validos");
        }
    } catch (e) {
        // Si sale error de CORS, intentamos con un segundo proxy más sencillo
        try {
            const resFallback = await fetch('https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://api.samp-api.com/v1/server/142.132.203.47/30858'));
            const dataFallback = await resFallback.json();
            
            if (dataFallback && dataFallback.players !== undefined) {
                info.innerText = "Online: " + dataFallback.players + " / " + dataFallback.maxPlayers;
                info.style.color = "#22c55e";
                dot.style.backgroundColor = "#22c55e";
                dot.style.boxShadow = "0 0 15px #22c55e";
            }
        } catch (err) {
            console.error("Fallo total:", err);
            info.innerText = "Servidor Offline";
            info.style.color = "#ef4444";
            dot.style.backgroundColor = "#ef4444";
            dot.style.boxShadow = "none";
        }
    }
}

// Ejecutar al cargar
actualizarEstado();
// Actualizar cada 20 segundos
setInterval(actualizarEstado, 20000);

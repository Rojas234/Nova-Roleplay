/**
 * LÓGICA DE ESTADO (IP: 142.132.203.47:30858)
 */
async function actualizarEstado() {
    const info = document.getElementById('player-info');
    const dot = document.getElementById('status-dot');

    if (!info || !dot) return;

    const ip = "142.132.203.47";
    const puerto = "30858";

    try {
        // Usamos AllOrigins para saltar bloqueos de CORS y resolución de nombres
        const proxy = "https://api.allorigins.win/get?url=";
        const apiTarget = encodeURIComponent(`https://api.samp-api.com/v1/server/${ip}/${puerto}`);
        
        const res = await fetch(proxy + apiTarget);
        if (!res.ok) throw new Error("Proxy caido");

        const json = await res.json();
        const data = JSON.parse(json.contents);

        if (data && data.players !== undefined) {
            info.innerText = `Online: ${data.players} / ${data.maxPlayers}`;
            info.style.color = "#22c55e";
            dot.style.backgroundColor = "#22c55e";
            dot.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error("Server no responde");
        }
    } catch (e) {
        console.error("Error de conexión:", e);
        info.innerText = "Servidor Offline";
        info.style.color = "#ef4444";
        dot.style.backgroundColor = "#ef4444";
        dot.style.boxShadow = "none";
    }
}

// Iniciar y programar
actualizarEstado();
setInterval(actualizarEstado, 30000);

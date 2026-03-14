// CONFIGURACIÓN DE TU SERVIDOR EN LEMEHOST
const IP_REAL = "135.148.164.122"; 
const PUERTO_REAL = "30498";

async function consultarServidor() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    // Intentar con la API de SAMP-Servers (Muy buena para hostings)
    try {
        const res = await fetch(`https://api.samp-servers.net/v2/server/${IP_REAL}:${PUERTO_REAL}`);
        const data = await res.json();

        if (data && data.core && data.core.online) {
            mostrarOnline(data.core.players, data.core.maxplayers);
            return;
        }
    } catch (e) { console.log("Intento 1 fallido..."); }

    // Si falla la primera, intentar con la API de Open.MP
    try {
        const res = await fetch(`https://api.open.mp/server/${IP_REAL}:${PUERTO_REAL}`);
        const data = await res.json();

        if (data && data.Players !== undefined) {
            mostrarOnline(data.Players, data.MaxPlayers);
            return;
        }
    } catch (e) { console.log("Intento 2 fallido..."); }

    // Si todo falla, mostrar Offline
    mostrarOffline();
}

function mostrarOnline(online, max) {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');
    
    infoTexto.innerText = `Jugadores: ${online} / ${max}`;
    puntoEstado.style.backgroundColor = "#22c55e"; // Verde
    puntoEstado.style.boxShadow = "0 0 15px #22c55e";
}

function mostrarOffline() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');
    
    infoTexto.innerText = "Servidor Offline";
    puntoEstado.style.backgroundColor = "#ef4444"; // Rojo
    puntoEstado.style.boxShadow = "0 0 15px #ef4444";
}

// Ejecutar al cargar y cada 30 segundos
consultarServidor();
setInterval(consultarServidor, 30000);

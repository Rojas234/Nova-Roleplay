// Configuración de tu servidor
const SERVER_IP = "sv.medallorp.com"; // Cambia esto por tu IP numérica o dominio
const SERVER_PORT = "7777";        // Cambia esto por tu puerto

async function updateServerStatus() {
    const playerInfo = document.getElementById('player-info');
    const statusDot = document.getElementById('status-dot');

    try {
        // Usamos una API gratuita para obtener los datos
        const response = await fetch(`https://api.open.mp/server/${SERVER_IP}:${SERVER_PORT}`);
        const data = await response.json();

        if (data && data.status === "online") {
            // Si el servidor está encendido
            playerInfo.innerText = `Jugadores: ${data.players} / ${data.maxplayers}`;
            statusDot.style.backgroundColor = "#22c55e"; // Verde
            statusDot.style.boxShadow = "0 0 10px #22c55e";
        } else {
            // Si el servidor está apagado o no responde
            playerInfo.innerText = "Servidor: Offline";
            statusDot.style.backgroundColor = "#ef4444"; // Rojo
            statusDot.style.boxShadow = "0 0 10px #ef4444";
        }
    } catch (error) {
        playerInfo.innerText = "Error al conectar";
        statusDot.style.backgroundColor = "#6b7280"; // Gris
    }
}

// Actualizar al cargar y luego cada 30 segundos
updateServerStatus();
setInterval(updateServerStatus, 30000);

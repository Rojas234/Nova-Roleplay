const IP_SERVIDOR = "135.148.164.122"; 
const PUERTO_SERVIDOR = "30498";

async function obtenerEstado() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    try {
        // Intento 1: API de SAMP-Servers (Muy estable)
        const respuesta = await fetch(`https://api.samp-servers.net/v2/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
        const datos = await respuesta.json();

        if (datos && datos.core && datos.core.online) {
            infoTexto.innerText = `Jugadores: ${datos.core.players} / ${datos.core.maxplayers}`;
            puntoEstado.style.backgroundColor = "#22c55e";
            puntoEstado.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error();
        }
    } catch (error) {
        // Intento 2: API de Open.mp (Respaldo)
        try {
            const res2 = await fetch(`https://api.open.mp/server/${IP_SERVIDOR}:${PUERTO_SERVIDOR}`);
            const datos2 = await res2.json();
            if (datos2 && datos2.Players !== undefined) {
                infoTexto.innerText = `Jugadores: ${datos2.Players} / ${datos2.MaxPlayers}`;
                puntoEstado.style.backgroundColor = "#22c55e";
                puntoEstado.style.boxShadow = "0 0 15px #22c55e";
            } else {
                throw new Error();
            }
        } catch (e) {
            infoTexto.innerText = "Servidor Offline";
            puntoEstado.style.backgroundColor = "#ef4444";
            puntoEstado.style.boxShadow = "0 0 15px #ef4444";
        }
    }
}

obtenerEstado();
setInterval(obtenerEstado, 30000);

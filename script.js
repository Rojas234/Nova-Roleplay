/**
 * CONFIGURACIÓN DE TU SERVIDOR - NUEVA IP
 */
const IP_SERVIDOR = "142.132.203.47"; 
const PUERTO_SERVIDOR = "30858";

async function actualizarEstado() {
    const texto = document.getElementById('player-info');
    const punto = document.getElementById('status-dot');

    try {
        // Usamos un proxy para evitar bloqueos del hosting o del navegador (CORS)
        const proxy = "https://api.allorigins.win/get?url=";
        const apiTarget = `https://api.samp-api.com/v1/server/${IP_SERVIDOR}/${PUERTO_SERVIDOR}`;
        
        const respuesta = await fetch(proxy + encodeURIComponent(apiTarget));
        const json = await respuesta.json();
        
        // Parseamos los datos que vienen del túnel
        const datos = JSON.parse(json.contents);

        if (datos && datos.players !== undefined) {
            // ESTADO: ACTIVO
            texto.innerText = `ACTIVO (${datos.players} / ${datos.maxPlayers})`;
            texto.style.color = "#22c55e"; 
            punto.style.backgroundColor = "#22c55e";
            punto.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error("Servidor no responde");
        }
    } catch (error) {
        // ESTADO: APAGADO
        // Si el servidor está abierto y sale esto, revisa que 'query 1' esté en el cfg
        texto.innerText = "APAGADO";
        texto.style.color = "#ef4444"; 
        punto.style.backgroundColor = "#ef4444";
        punto.style.boxShadow = "0 0 15px #ef4444";
    }
}

// Ejecutar al cargar la página
actualizarEstado();

// Actualizar automáticamente cada 20 segundos
setInterval(actualizarEstado, 20000);

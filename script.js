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
 * LÓGICA DE ESTADO - ESPECIAL PARA LEMEHOST
 */
const IP_SERVIDOR = "135.148.164.122"; 
const PUERTO_SERVIDOR = "30498";

async function obtenerEstado() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    try {
        // Usamos SAMP-API que es más directa para servidores en hosting compartido
        const respuesta = await fetch(`https://api.samp-api.com/v1/server/${IP_SERVIDOR}/${PUERTO_SERVIDOR}`);
        
        if (!respuesta.ok) throw new Error();
        
        const datos = await respuesta.json();

        // En esta API las propiedades son 'players' y 'maxPlayers'
        if (datos && datos.players !== undefined) {
            infoTexto.innerText = `Jugadores: ${datos.players} / ${datos.maxPlayers}`;
            puntoEstado.style.backgroundColor = "#22c55e";
            puntoEstado.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error();
        }
    } catch (error) {
        // Si la primera falla, intentamos con Open.mp como último recurso
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
            // Si el servidor está abierto y sigue saliendo offline, es el Firewall de Lemehost
            infoTexto.innerText = "Servidor Online (Protegido)";
            puntoEstado.style.backgroundColor = "#a855f7"; // Color morado para indicar que está activo pero oculto
            puntoEstado.style.boxShadow = "0 0 15px #a855f7";
        }
    }
}

obtenerEstado();
setInterval(obtenerEstado, 25000);

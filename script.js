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
 * LÓGICA DE ESTADO AUTOMÁTICO (IP: 135.148.164.122)
 */
const IP_SERVIDOR = "142.132.203.47"; 
const PUERTO_SERVIDOR = "30858";

async function obtenerEstado() {
    const infoTexto = document.getElementById('player-info');
    const puntoEstado = document.getElementById('status-dot');

    try {
        // Consultamos directamente a Open.mp (es la más precisa para servidores en Lemehost)
        const respuesta = await fetch(`https://api.open.mp/server/${142.132.203.47}:${30858}`);
        
        // Si la respuesta no es OK, forzamos el error para ir al catch (CERRADO)
        if (!respuesta.ok) throw new Error("Offline");

        const datos = await respuesta.json();

        // Si la API devuelve una dirección, el servidor está ABIERTO
        if (datos && datos.Address) {
            infoTexto.innerText = `ABIERTO (${datos.Players} / ${datos.MaxPlayers})`;
            infoTexto.style.color = "#22c55e"; // Texto verde
            puntoEstado.style.backgroundColor = "#22c55e";
            puntoEstado.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error("No data");
        }

    } catch (error) {
        // Este bloque se ejecuta automáticamente si el servidor está CERRADO
        infoTexto.innerText = "CERRADO";
        infoTexto.style.color = "#ef4444"; // Texto rojo
        puntoEstado.style.backgroundColor = "#ef4444";
        puntoEstado.style.boxShadow = "0 0 15px #ef4444";
    }
}

// Ejecutar al cargar la página
obtenerEstado();

// Actualización automática cada 20 segundos
setInterval(obtenerEstado, 20000);

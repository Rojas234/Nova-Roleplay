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
    // Buscamos los IDs que tienes en tu HTML según la foto
    const texto = document.getElementById('player-info');
    const punto = document.getElementById('status-dot');

    // Si no existen estos IDs, el script no hará nada para evitar errores
    if (!texto || !punto) return;

    try {
        // Usamos la API de Open.mp que es más confiable para Lemehost
        const urlApi = `https://api.open.mp/server/${IP_NUEVA}:${PUERTO_NUEVO}`;
        
        const respuesta = await fetch(urlApi);
        if (!respuesta.ok) throw new Error();

        const datos = await respuesta.json();

        if (datos && datos.Address) {
            texto.innerText = `ACTIVO (${datos.Players} / ${datos.MaxPlayers})`;
            punto.style.backgroundColor = "#22c55e"; // Verde
            punto.style.boxShadow = "0 0 15px #22c55e";
        } else {
            throw new Error();
        }
    } catch (e) {
        // Si falla, sale OFFLINE
        texto.innerText = "Servidor Offline";
        punto.style.backgroundColor = "#ef4444"; // Rojo
        punto.style.boxShadow = "0 0 10px #ef4444";
    }
}

// Ejecutar al cargar
actualizarEstado();
// Actualizar cada 20 segundos
setInterval(actualizarEstado, 20000);

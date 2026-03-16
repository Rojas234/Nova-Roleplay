// Configuración de tu servidor
const SERVER_IP = "135.148.164.122";
const SERVER_PORT = "30498";

async function chequearServidor() {
    const texto = document.getElementById('status-text');
    const punto = document.getElementById('status-dot');

    try {
        // Usamos la API de Open.mp que es la más precisa
        const respuesta = await fetch(`https://api.open.mp/server/${SERVER_IP}:${SERVER_PORT}`);
        
        // Si el servidor responde correctamente
        if (respuesta.ok) {
            const datos = await respuesta.json();
            
            // Si la API confirma que hay datos del servidor
            if (datos && datos.Address) {
                texto.innerText = "ACTIVO";
                texto.style.color = "#22c55e"; // Verde
                punto.style.backgroundColor = "#22c55e";
                punto.style.boxShadow = "0 0 15px #22c55e";
            } else {
                throw new Error("Sin respuesta");
            }
        } else {
            throw new Error("Offline");
        }

    } catch (error) {
        // Si hay un error (servidor apagado o error de red)
        texto.innerText = "APAGADO";
        texto.style.color = "#ef4444"; // Rojo
        punto.style.backgroundColor = "#ef4444";
        punto.style.boxShadow = "0 0 15px #ef4444";
    }
}

// Ejecutar cuando cargue la página
chequearServidor();

// Actualizar cada 15 segundos para que sea automático
setInterval(chequearServidor, 15000);

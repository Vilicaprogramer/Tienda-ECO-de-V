const express = require('express');
const app = express();

const path = require('path');

// --- Configuración de Archivos Estáticos ---
// Usamos path.join y __dirname para asegurar que la ruta a la carpeta 'public' 
// sea correcta sin importar dónde se ejecute el código (local o nube).
app.use(express.static(path.join(__dirname, '../public')));

// --- Ruta Raíz Explícita ---
// Le decimos a Express:"Cuando alguien entre a la raíz (/), entrega manualmente el index.html".
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// --- Middlewares ---
// 1. Necesario para que la API pueda entender datos enviados en formato JSON (POST)
app.use(express.json());
// 2. Servir archivos estáticos (HTML/CSS)
// app.use(express.static('public')); 

// -- Controladores --
const { comprobarDisponibilidad, finalizarPedido, obtenerCatalogoDisponible} = require('./controllers/pedidoController');

// Endpoint de finalizar y guardar pedido
app.post('/api/finalizar-pedido', finalizarPedido);

// Endpoint de validación
app.post('/api/validar-stock', comprobarDisponibilidad);

// Endopoint para el desplegable de productos
app.get('/api/catalogo', obtenerCatalogoDisponible)

/* app.listen(3000, () => console.log('Servidor en puerto 3000')); */

// --- Ejecución Dual (Local vs. Nube) ---
// La condición 'require.main === module' verifica si el archivo se está ejecutando
// directamente (node app.js). Si es así, inicia el servidor en el puerto 3000.
// Si no, simplemente exportamos la app (module.exports) para que Vercel la tome y la gestione.
if (require.main === module) {
    app.listen(3000, () => console.log('Servidor local en puerto 3000'));
}

// Exportamos la instancia de la app para que el archivo api/index.js de Vercel la use
module.exports = app;
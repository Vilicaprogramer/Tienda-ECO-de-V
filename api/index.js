// api/index.js
const app = require('../src/app'); 

// Vercel necesita exportar la app como una función, no llamar a app.listen
module.exports = app;
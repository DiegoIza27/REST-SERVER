// ====================000000
// PUERTO
// ==================================
// 
process.env.PORT = process.env.PORT || 3000;

// Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// base de datos 
let url;
// if (process.env.NODE_ENV === 'dev') {
//     url = 'mongodb://localhost:27017/cafe'
// } else {
url = process.env.MONGOURL;
// }

process.env.URLDB = url;
/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');

// const path = `${__dirname}archivo.md`;
// Para ver si el archivo existe
fs.access('./lib', (err) => {
  console.log(`${'./lib'} ${err ? 'does not exist' : 'exists'}`);
});

// PARA SABER SI SU RUTA ES ABSOLUTA
console.log('Es ruta absoluta', path.isAbsolute('./lib'));

// PARA SABER SI ES directorio
console.log('Es un directorio:', fs.lstatSync('./lib').isDirectory());

// PARA SABER SI ES UN ARCHIVO
console.log('Es un archivo:', fs.lstatSync('./lib').isFile());

// PARA LEER EL DIRECTORIO
fs.readdir('./lib', (error, archivos) => {
  archivos.forEach((file) => console.log(file));
});

fs.readFile('./lib/archivo.md', 'utf-8', (error, data) => {
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
});

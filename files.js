/* eslint-disable linebreak-style */
const filePath = './lib'; // const path = `${__dirname}archivo.md`;
const fs = require('fs');
const path = require('path');

// Para ver si el archivo existe
const pathExist = (route) => fs.existsSync(route);
console.log('La ruta existe:', pathExist(filePath));

// PARA SABER SI SU RUTA ES ABSOLUTA
const isPathAbsolute = (route) => path.isAbsolute(route);
console.log('Es ruta absoluta:', isPathAbsolute(filePath));

// CONVIERTE A RUTA ABSOLUTA
const relativeToAbsolutePath = (route) => path.resolve(route);
console.log(relativeToAbsolutePath(filePath));

// PARA SABER SI ES directorio
const isDirectory = (route) => fs.lstatSync(route).isDirectory();
console.log('Es un directorio:', isDirectory(filePath));

// PARA SABER SI ES UN ARCHIVO
const isFile = (route) => fs.lstatSync(route).isFile();
console.log('Es un archivo:', isFile(filePath));

// PARA LEER EL DIRECTORIO
const readDir = (route) => fs.readdirSync(route);
// console.log(readDir(relativeToAbsolutePath(filePath)));

function findMdFile(route) {
  const laRuta = route;
  if (isFile(laRuta)) {
    console.log(laRuta, '-----> Es un archivo');
  } else if (isDirectory(laRuta)) {
    console.log(laRuta, '----> Es un directorio');
    const dirFiles = readDir(laRuta);
    console.log(dirFiles);
    dirFiles.forEach((elem) => {
      const pathelem = elem;
      const newpath = path.join(laRuta, pathelem);
      findMdFile(newpath);
    });
    // LEER SI FILE ES UN ARCHIVO MD... LUEGO LEER EL ARCHIVO
  }
}
findMdFile(relativeToAbsolutePath(filePath));

/* const isFile = (pathsDir, listMd) => {
  pathsDir.forEach((elem) => {
    const pathElem = elem;
    if (isDir(elem)) {
      const readElem = readDir(pathElem);
      if (readElem.length > 0) {
        const pathsDirElem = pathJoin(readElem, pathElem);
        isFile(pathsDirElem, listMd);
      }
    } else if (pathExtname) {
      listMd.push(elem);
    }
  });
}; */

// LEYENDO EL ARCHIVO MD
/* const fileLinks = [];
fs.readFile('./lib/archivo.md', 'utf-8', (error, data) => {
  if (!error) {
    console.log(data);
    fileLinks.push(data.split('\n').filter((line) => line.includes('https')));
    console.log(fileLinks);
  } else {
    console.log(error);
  }
}); */

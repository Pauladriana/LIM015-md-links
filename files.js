/* eslint-disable linebreak-style */
const filePath = './lib';
const fs = require('fs');
const path = require('path');

const pathExist = (route) => fs.existsSync(route);
console.log('Path exists:', pathExist(filePath));

const isPathAbsolute = (route) => path.isAbsolute(route);
console.log('Path is absolute:', isPathAbsolute(filePath));

const relativeToAbsolutePath = (route) => path.resolve(route);
console.log(relativeToAbsolutePath(filePath));

const isDirectory = (route) => fs.lstatSync(route).isDirectory();
console.log('Path is a directory:', isDirectory(filePath));

const isFile = (route) => fs.lstatSync(route).isFile();
console.log('Path is a file:', isFile(filePath));

const isMd = (route) => path.extname(route) === '.md';

const readDir = (route) => fs.readdirSync(route);
// console.log(readDir(relativeToAbsolutePath(filePath)));

const mdPaths = [];
function findMdFile(route) {
  const readPath = route;
  if (isFile(readPath)) {
    // console.log(readPath, '-----> Es un archivo');
    if (isMd(readPath)) {
      mdPaths.push(readPath);
    }
  } else if (isDirectory(readPath)) {
    console.log(readPath, '----> Is a directory');
    const dirFiles = readDir(readPath);
    console.log(dirFiles);
    dirFiles.forEach((elem) => {
      const pathelem = elem;
      const newpath = path.join(readPath, pathelem);
      findMdFile(newpath);
    });
  }
}
findMdFile(relativeToAbsolutePath(filePath));
console.log('The MD files are:', mdPaths);

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

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

const regexToMatch = {
  mdLinks: new RegExp(/\[([\w\s\d./?=#&_%~,.:-]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  link: new RegExp(/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  text: new RegExp(/\[([\w\s\d./?=#&_%~,.:-]+)\]/g),
};

// LEYENDO EL ARCHIVO MD
const fileLinks = [];
const readMdLinks = (arrMdFiles) => {
  arrMdFiles.forEach((md) => {
    fs.readFile(md, 'utf-8', (error, fileContent) => {
      if (!error) {
        console.log(fileContent, 60);
        const fileMdContent = fileContent.match(regexToMatch.mdLinks);
        if (fileMdContent) {
          fileMdContent.forEach((link) => {
            const hrefLink = link.match(regexToMatch.link).join().slice(1, -1);
            const textLink = link.match(regexToMatch.text).join().slice(1, -1);
            const objLinks = {
              href: hrefLink,
              text: textLink,
              file: md,
            };
            fileLinks.push(objLinks);
          });
          console.log(fileLinks, 70);
        }
      } else {
        console.log(error, 65);
      }
    });
  });
};

readMdLinks(mdPaths);

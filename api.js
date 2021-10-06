const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const pathExist = (route) => fs.existsSync(route);

const relativeToAbsolutePath = (route) => path.resolve(route);

const isDirectory = (route) => fs.lstatSync(route).isDirectory();

const isFile = (route) => fs.lstatSync(route).isFile();

const isMd = (route) => path.extname(route) === '.md';

const readDir = (route) => fs.readdirSync(route);

const readFile = (route) => fs.readFileSync(route, 'utf8');

function findMdFile(route) {
  let mdPaths = [];
  const readPath = route;
  if (isFile(readPath)) {
    if (isMd(readPath)) {
      mdPaths.push(readPath);
    }
  } else if (isDirectory(readPath)) {
    const dirFiles = readDir(readPath);
    dirFiles.forEach((elem) => {
      const pathelem = elem;
      const newpath = path.join(readPath, pathelem);
      const newArr = findMdFile(newpath);
      mdPaths = newArr.concat(mdPaths);
    });
  }
  return mdPaths;
}

const regexToMatch = {
  mdLinks: new RegExp(/\[([\w\s\d./?=#&_%~,.:-]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  link: new RegExp(/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  text: new RegExp(/\[([\w\s\d./?=#&_%~,.:-]+)\]/mg),
};

// LEYENDO EL ARCHIVO MD
const readMdLinks = (arrMdFiles) => {
  const fileLinks = [];
  arrMdFiles.forEach((md) => {
    const fileMdContent = readFile(md).match(regexToMatch.mdLinks);
    if (fileMdContent) {
      fileMdContent.forEach((link) => {
        const hrefLink = link.match(regexToMatch.link).join().slice(1, -1);
        const textLink = link.match(regexToMatch.text).join().slice(1, -1);
        const objLinks = {
          href: hrefLink,
          text: textLink.substring(0, 50),
          file: md,
        };
        fileLinks.push(objLinks);
      });
    }
  });
  return fileLinks;
};

const fetchLink = (link) => fetch(link.href)
  .then((res) => {
    const statusText = res.status === 200 ? 'Ok' : 'Fail';
    return {
      ...link,
      status: res.status,
      ok: statusText,
    };
  })
  .catch(() => ({
    ...link,
    status: 'Error',
    ok: 'Fail',
  }));

module.exports = {
  pathExist,
  relativeToAbsolutePath,
  isDirectory,
  isFile,
  isMd,
  readDir,
  readFile,
  findMdFile,
  readMdLinks,
  fetchLink,
};

/* eslint-disable linebreak-style */
const mdLinks = require('./index');
// CUENTA:
const stats = (arr) => arr.length;
const unique = (arr) => new Set(arr).size;
const broken = (arr) => new Set(arr.filter((link) => link.ok === 'Fail')).size;

// Obteniendo la ruta

const processArg = process.argv;
const path = processArg[2];

const help = 'Try to write after your path: --stats, --validate, or both';

if (processArg.length === 5) {
  if (processArg.includes('--stats') && processArg.includes('--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(`Total: ${stats(res)}\nUnique: ${unique(res)}\nBroken: ${broken(res)}`))
      .catch((err) => console.log(err));
  } else {
    console.log(help);
  }
} else if (processArg.length === 4) {
  if (processArg.includes('--stats')) {
    mdLinks(path, { validate: false })
      .then((res) => console.log(`Total: ${stats(res)}\nUnique: ${unique(res)}`))
      .catch((err) => console.log(err));
  } else if (processArg.includes('--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    console.log(help);
  }
} else if (processArg.length === 3) {
  mdLinks(path).then((res) => console.log(res)).catch((err) => console.log(err));
} else {
  console.log(help);
}

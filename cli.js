/* eslint-disable linebreak-style */
const chalk = require('chalk');
const mdLinks = require('./index');
// CUENTA:
const stats = (arr) => `Total: ${arr.length}`;
const unique = (arr) => `Unique: ${new Set(arr).size}`;
const broken = (arr) => `Broken: ${new Set(arr.filter((link) => link.ok === 'Fail')).size}`;

// Obteniendo la ruta

const processArg = process.argv;
const path = processArg[2];

const help = 'Try to write after your path: --stats, --validate, or both';

if (processArg.length === 5) {
  if (processArg.includes('--stats') && processArg.includes('--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(`${stats(res)}\n${chalk.cyan(unique(res))}\n${chalk.bold.red(broken(res))}`))
      .catch((err) => console.log(chalk.red(chalk.white(err))));
  } else {
    console.log(chalk.bgBlue(chalk.white(help)));
  }
} else if (processArg.length === 4) {
  if (processArg.includes('--stats')) {
    mdLinks(path, { validate: false })
      .then((res) => console.log(`${stats(res)}\n${chalk.cyan(unique(res))}`))
      .catch((err) => console.log(chalk.bgRed(chalk.white(err))));
  } else if (processArg.includes('--validate')) {
    mdLinks(path, { validate: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(chalk.bgRed(chalk.white(err))));
  } else {
    console.log(chalk.bgBlue(chalk.white(help)));
  }
} else if (processArg.length === 3) {
  mdLinks(path)
    .then((res) => console.log(res))
    .catch((err) => console.log(chalk.bgRed(chalk.white(err))));
} else {
  console.log(chalk.bgBlue(chalk.white(help)));
}

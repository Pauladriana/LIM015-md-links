#!/usr/bin/env node
const paths = require('path');
const chalk = require('chalk');
const mdLinks = require('./index');
// CUENTA:
const stats = (arr) => `Total: ${arr.length}`;
const unique = (arr) => {
  const jsonObject = arr.map(JSON.stringify);
  const uniqueSet = new Set(jsonObject);
  const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  return `Unique: ${uniqueArray.length}`;
};
const broken = (arr) => {
  const jsonObject = arr.map(JSON.stringify);
  const uniqueSet = new Set(jsonObject);
  const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  return `Broken: ${uniqueArray.filter((link) => link.ok === 'Fail').length}`;
};

const prc = process.argv;
const pathOnly = prc[2];

const help = 'Try to write after your path: --stats, --validate, or both';
const cli = (processArg, path) => {
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
        .then((res) => console.log(res.map((obj) => {
          const route = paths.relative(__dirname, obj.file);
          const status = obj.status === 200 ? chalk.green(obj.status) : chalk.red(obj.status);
          const statusText = obj.ok === 'Ok' ? chalk.green(obj.ok) : chalk.red(obj.ok);
          return `${route}  ${chalk.cyan(obj.href)}  ${statusText}  ${status}  ${obj.text}`;
        }).join('\n')))
        .catch((err) => console.log(chalk.bgRed(chalk.white(err))));
    } else {
      console.log(chalk.bgBlue(chalk.white(help)));
    }
  } else if (processArg.length === 3) {
    mdLinks(path)
      .then((res) => console.log(res.map((obj) => {
        const route = paths.relative(__dirname, obj.file);
        return `${route} ${chalk.cyan(obj.href)} ${obj.text}`;
      }).join('\n')))
      .catch((err) => console.log(chalk.bgRed(chalk.white(err))));
  }
};

cli(prc, pathOnly);

module.exports = {
  stats,
  unique,
  broken,
};

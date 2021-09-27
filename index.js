/* eslint-disable linebreak-style */
/* eslint-disable no-lonely-if */
/* eslint-disable prefer-promise-reject-errors */
const api = require('./api');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  if (!(api.pathExist(path))) {
    reject('The path does not exist');
  } else {
    const absolutePath = api.relativeToAbsolutePath(path);
    const searchPath = api.findMdFile(absolutePath); // Retorna el array cona archivos md
    console.log(searchPath, 12);
    if (!searchPath) {
      reject('The path does not have markdown files');
    } else {
      const getLinks = api.readMdLinks(searchPath); // Retorna array con objeto de links -3 prop-
      console.log(getLinks, 17);
      if (!getLinks) {
        reject('The file does not contain mdLinks');
      } else if (option && option.validate === true) {
        const validateLinks = getLinks.map((link) => {
          const linkObj = api.fetchLink(link);
          return linkObj;
        });
        resolve(Promise.all(validateLinks));
      } else {
        resolve(getLinks);
      }
    }
  }
});

console.log(mdLinks('lib/archivo2.md', { validate: true }));

module.exports = mdLinks;

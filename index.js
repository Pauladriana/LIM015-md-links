const api = require('./api');

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  if (!(api.pathExist(path))) {
    reject('Error: Path not found');
  } else {
    const absolutePath = api.relativeToAbsolutePath(path);
    const searchPath = api.findMdFile(absolutePath); // Retorna el array cona archivos md
    if (searchPath.length === 0) {
      reject('Error: there are not markdown files');
    } else {
      const getLinks = api.readMdLinks(searchPath); // Retorna array con objeto de links -3 prop-
      if (getLinks.length === 0) {
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

module.exports = mdLinks;

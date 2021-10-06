const api = require('../api.js');

const path = 'lib/anotherLib/Lib5/archivo4.md';
describe('API', () => {
  it('Returns true if a path exist', () => {
    expect(api.pathExist(path)).toBe(true);
  });
  it('Returns an absolute path', () => {
    expect(api.relativeToAbsolutePath(path)).toBe('C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md');
  });
  it('Returns true the path is a directory', () => {
    expect(api.isDirectory(path)).toBe(false);
  });
  it('Returns true the path is a file', () => {
    expect(api.isFile(path)).toBe(true);
  });
  it('Returns true the path is .md file', () => {
    expect(api.isMd(path)).toBe(true);
  });
  it('Reads a directory and returns its elements into an array', () => {
    const dir = './lib/';
    const result = ['anotherLib', 'archivo.md', 'archivo2.md', 'Lib3', 'nada.js', 'no.html', 'otrox.txt'];
    expect(api.readDir(dir)).toEqual(result);
  });
  it('Reads a file and returns its content', () => {
    const file = './lib/archivo2.md';
    const result = 'Este no tiene links pero es un archivo markdown';
    expect(api.readFile(file)).toEqual(result);
  });
  it('Search for mdFiles and returns an array of paths', () => {
    const route = './lib/';
    const result = ['lib\\archivo2.md', 'lib\\archivo.md', 'lib\\anotherLib\\Lib5\\archivo5.md', 'lib\\anotherLib\\Lib5\\archivo4.md', 'lib\\anotherLib\\archivo3.md'];
    expect(api.findMdFile(route)).toEqual(result);
  });
  it('Reads .md file and returns an array of objects(links)', () => {
    const mdFile = ['lib/anotherLib/Lib5/archivo4.md'];
    const mdLinks = [
      {
        href: 'https://www.ecosia.org/images?q=playa',
        text: 'playa',
        file: 'lib/anotherLib/Lib5/archivo4.md',
      },
    ];
    expect(api.readMdLinks(mdFile)).toEqual(mdLinks);
  });
});

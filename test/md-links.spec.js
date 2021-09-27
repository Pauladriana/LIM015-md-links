/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
const api = require('../files.js');

const path = 'lib/anotherLib/Lib5/archivo4.md';

describe('API', () => {
  it('Returns true if a path exist', () => {
    expect(api.pathExist(path)).toBe(true);
  });
  it('Returns true if a path is absolute', () => {
    expect(api.isPathAbsolute(path)).toBe(false);
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
    const dir = 'lib/anotherLib/Lib5';
    expect(typeof api.readDir(dir)).toBe('object');
  });
  it('Reads .md file and returns an array', () => {
    const arrMd = ['C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md', 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md'];
    expect(typeof api.readMdLinks(arrMd)).toBe('object');
  });
});

jest.mock('node-fetch');
const fetch = require('node-fetch');
const api = require('../api.js');

describe('Fetch API', () => {
  it('404: fail', () => {
    const mdLinks = {
      href: 'https://httpstat.us/404',
      text: '404 link',
      file: 'lib/anotherLib/Lib6/archivo5.md',
    };
    const fetchLink = {
      href: 'https://httpstat.us/404',
      text: '404 link',
      file: 'lib/anotherLib/Lib6/archivo5.md',
      status: 404,
      ok: 'Fail',
    };
    fetch.mockReturnValue(Promise.resolve({
      status: 404,
      statusText: 'Fail',
    }));
    return api.fetchLink(mdLinks).then((res) => expect(res).toEqual(fetchLink));
  });
  it('Error: Fail', () => {
    const mdLinks = {
      href: 'https://pauinventaunlink.org/hola/',
      text: 'link inventado',
      file: 'lib/anotherLib/Lib5/archivo4.md',
    };
    const fetchLink = {
      href: 'https://pauinventaunlink.org/hola/',
      text: 'link inventado',
      file: 'lib/anotherLib/Lib5/archivo4.md',
      status: 'Error',
      ok: 'Fail',
    };
    fetch.mockReturnValue(Promise.resolve());
    return api.fetchLink(mdLinks).then((res) => expect(res).toEqual(fetchLink));
  });
  it('200: Ok', () => {
    const mdLinks = {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'lib/anotherLib/Lib5/archivo3.md',
    };
    const fetchLink = {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'lib/anotherLib/Lib5/archivo3.md',
      status: 200,
      ok: 'Ok',
    };
    fetch.mockReturnValue(Promise.resolve({
      status: 200,
      statusText: 'Ok',
    }));
    return api.fetchLink(mdLinks).then((res) => expect(res).toEqual(fetchLink));
  });
});

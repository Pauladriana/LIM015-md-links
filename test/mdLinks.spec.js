const mdLinks = require('../index.js');

describe('mdLinks errors', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Returns error message when path is not found', () => {
    const error = 'Error: Path not found';
    expect(mdLinks('./lib66/')).rejects.toEqual(error);
  });
  it('Returns error message when there is not markdown files', () => {
    const error = 'Error: there are not markdown files';
    expect(mdLinks('./lib/Lib3')).rejects.toEqual(error);
  });
  it('Returns error message if there is not markdown links', () => {
    const error = 'The file does not contain mdLinks';
    expect(mdLinks('./lib/archivo2.md')).rejects.toEqual(error);
  });
});

describe('mdLinks', () => {
  it('Returns array of links with href, text and path without validate object', () => {
    const obj = [
      {
        href: 'https://nodejs.org/es/',
        text: 'node.js',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo5.md',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo5.md',
      },
    ];
    expect(mdLinks('lib/anotherLib/Lib5/archivo5.md')).resolves.toEqual(obj);
  });
  it('Returns array of links with href, text and path with { validate : false }', () => {
    const obj2 = [
      {
        href: 'https://nodejs.org/es/',
        text: 'node.js',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo5.md',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo5.md',
      },
    ];
    expect(mdLinks('lib/anotherLib/Lib5/archivo5.md', { validate: false })).resolves.toEqual(obj2);
  });
  it('Returns array of validated links with href, text, path, status and ok', () => {
    const obj3 = [
      {
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        href: 'https://www.ecosia.org/images?q=playa',
        ok: 'Fail',
        status: 503,
        text: 'playa',
      },
    ];
    expect(mdLinks('./lib/anotherLib/Lib5/archivo4.md', { validate: true })).resolves.toEqual(obj3);
  });
});

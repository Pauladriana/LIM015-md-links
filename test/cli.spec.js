const { spawn } = require('child_process');
const cli = require('../cli.js');

describe('Links Stats', () => {
  it('Returns total number of links', () => {
    const arr = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://www.ecosia.org/images?q=playa',
        text: 'playa',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 503,
        ok: 'Fail',
      },
      {
        href: 'https://pauinventaunlink.org/hola/',
        text: 'link inventado',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 'Error',
        ok: 'Fail',
      },
    ];
    const result = `Total: ${4}`;
    expect(cli.stats(arr)).toBe(result);
  });
  it('Returns total number of no-repeated links', () => {
    const arr = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://www.ecosia.org/images?q=playa',
        text: 'playa',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 503,
        ok: 'Fail',
      },
      {
        href: 'https://pauinventaunlink.org/hola/',
        text: 'link inventado',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 'Error',
        ok: 'Fail',
      },
    ];
    const result = `Unique: ${3}`;
    expect(cli.unique(arr)).toBe(result);
  });
  it('Returns total number of broken links', () => {
    const arr = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\archivo3.md',
        status: 200,
        ok: 'Ok',
      },
      {
        href: 'https://www.ecosia.org/images?q=playa',
        text: 'playa',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 503,
        ok: 'Fail',
      },
      {
        href: 'https://pauinventaunlink.org/hola/',
        text: 'link inventado',
        file: 'C:\\Users\\Paula\\Documents\\GitHub\\LIM015-md-links\\lib\\anotherLib\\Lib5\\archivo4.md',
        status: 'Error',
        ok: 'Fail',
      },
    ];
    const result = `Broken: ${2}`;
    expect(cli.broken(arr)).toEqual(result);
  });
});

const execute = (comand, args = []) => {
  const createProcess = spawn(comand, args, { shell: process.platform === 'win32' });
  return new Promise((resolve, reject) => {
    createProcess.stdout.on('data', (data) => resolve(data.toString()));
    createProcess.stderr.on('data', (data) => reject(data.toString()));
    createProcess.on('exit', (code) => resolve(code));
  });
};

describe('CLI process', () => {
  test('Only Path', () => {
    execute('md-links', ['./lib/anotherLib/Lib5/archivo5.md']).then((res) => {
      expect(res).toBe('lib\\anotherLib\\Lib5\\archivo5.md https://nodejs.org/es/ node.js\nlib\\anotherLib\\Lib5\\archivo5.md https://es.wikipedia.org/wiki/Markdown Markdown\n');
    });
  });

  test('Path with --validate', () => {
    execute('md-links', ['./lib/anotherLib/Lib5/archivo5.md', '--validate']).then((res) => {
      expect(res).toBe('lib\\anotherLib\\Lib5\\archivo5.md  https://nodejs.org/es/  Ok  200  node.js\nlib\\anotherLib\\Lib5\\archivo5.md  https://es.wikipedia.org/wiki/Markdown  Ok  200  Markdown\n');
    });
  });

  test('Path with --stats', () => {
    execute('md-links', ['./lib/', '--stats']).then((res) => {
      expect(res).toBe('Total: 10\nUnique: 8\n');
    });
  });

  test('Path with --stats --validate', () => {
    execute('md-links', ['./lib/', '--stats', '--validate']).then((res) => {
      expect(res).toBe('Total: 10\nUnique: 8\nBroken: 1\n');
    });
  });

  test('Path that does not includes --validate and/or --stats', () => {
    execute('md-links', ['./lib/anotherLib/Lib5/archivo5.md', '--abc', 'bca--']).then((res) => {
      expect(res).toContain('Try to write after your path: --stats, --validate, or both');
    });
  });
  test('Path that does not includes --validate or --stats', () => {
    execute('md-links', ['./lib/anotherLib/Lib5/archivo5.md', '--abc']).then((res) => {
      expect(res).toContain('Try to write after your path: --stats, --validate, or both');
    });
  });

  test('Invalid path with --stats --validate', () => {
    execute('md-links', ['./lib8/', '--stats', '--validate']).catch((rej) => {
      expect(rej).toContain('Error: Path not found');
    });
  });
  test('Invalid path with --validate', () => {
    execute('md-links', ['./lib8/', '--validate']).catch((rej) => {
      expect(res).toContain('Error: Path not found');
    });
  });
  test('Invalid path with --stats', () => {
    execute('md-links', ['./lib8/', '--stats']).catch((rej) => {
      expect(res).toContain('Error: Path not found');
    });
  });
});

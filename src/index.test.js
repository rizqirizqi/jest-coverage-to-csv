import dirTree from 'directory-tree';
import { unlinkSync, readFileSync } from 'fs';
import { resolve as _resolve } from 'path';
import spawn from 'spawn-command';

const EXAMPLE_DIR = 'examples/coverage';

const getInputFile = (dir = EXAMPLE_DIR) => dirTree(dir, { extensions: /\.(json)/ });

const getOutputFile = (dir = EXAMPLE_DIR) => dirTree(dir, { extensions: /\.csv/ });

const clearOutputs = (dir = EXAMPLE_DIR) => {
  const outputFile = getOutputFile(dir);
  outputFile.children.forEach((img) => {
    unlinkSync(img.path);
  });
};

const runCLI = (args = '', cwd = process.cwd()) => {
  const isRelative = cwd[0] !== '/';
  let workingDir = cwd;
  if (isRelative) {
    workingDir = _resolve(__dirname, cwd);
  }

  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    const command = `yarn start ${args}`;
    const child = spawn(command, { cwd: workingDir });

    child.on('error', (error) => {
      reject(error);
    });

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', () => {
      if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

describe('Blackbox Test', () => {
  test('jest-coverage-to-csv --help', () => runCLI('--help').then((stdout) => {
    expect(stdout).toMatchSnapshot();
  }));

  describe('Convert Coverage to CSV', () => {
    beforeEach(() => {
      clearOutputs();
    });
    afterEach(() => {
      clearOutputs();
    });
    test('jest-coverage-to-csv examples/coverage/coverage-summary.json  examples/coverage/coverage-summary.csv | it converts the json file', async () => {
      const inputFile = getInputFile();
      let outputFile = getOutputFile();
      expect(inputFile.children.length).toBe(1);
      expect(outputFile.children.length).toBe(0);
      return runCLI(`${EXAMPLE_DIR}/coverage-summary.json ${EXAMPLE_DIR}/coverage-summary.csv`).then((stdout) => {
        outputFile = getOutputFile();
        expect(outputFile.children.length).toBe(1);
        expect(stdout.match(/Conversion to CSV success!/g)).toHaveLength(1);
        const fileContent = readFileSync(`${EXAMPLE_DIR}/coverage-summary.csv`, { encoding: 'utf8' });
        expect(fileContent).toMatchSnapshot();
      });
    });

    test('jest-coverage-to-csv examples/coverage/coverage-summary.json  examples/coverage/coverage-summary.csv --so --po | it converts the json file with option --so --po', async () => {
      const inputFile = getInputFile();
      let outputFile = getOutputFile();
      expect(inputFile.children.length).toBe(1);
      expect(outputFile.children.length).toBe(0);
      return runCLI(`${EXAMPLE_DIR}/coverage-summary.json ${EXAMPLE_DIR}/coverage-summary.csv --so --po`).then((stdout) => {
        outputFile = getOutputFile();
        expect(outputFile.children.length).toBe(1);
        expect(stdout.match(/Conversion to CSV success!/g)).toHaveLength(1);
        const fileContent = readFileSync(`${EXAMPLE_DIR}/coverage-summary.csv`, { encoding: 'utf8' });
        expect(fileContent).toMatchSnapshot();
      });
    });
  });
});

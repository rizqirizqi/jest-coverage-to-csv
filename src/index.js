#!/usr/bin/env node
import { usage } from 'yargs';
import { resolve } from 'path';
import fs from 'fs';
import { getExt, isFile } from './helpers';

const { argv } = usage('Convert jest coverage report from coverage-summary to csv\nUsage: jest-coverage-to-csv [source] [target] [options]')
  .wrap(null)
  .example('jest-coverage-to-csv')
  .example('jest-coverage-to-csv coverage/coverage-summary.json coverage/coverage-summary.csv')
  .example('yarn test --coverage --coverageReporters=json-summary && jest-coverage-to-csv')
  .options('so', {
    alias: 'statement-only',
    demandOption: false,
    default: false,
    describe: 'Print statement only instead of all summary',
    type: 'boolean',
  })
  .options('po', {
    alias: 'percentage-only',
    demandOption: false,
    default: false,
    describe: 'Print percentage only instead of all details',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v');

try {
  const source = argv._[0] || './coverage/coverage-summary.json';
  let target = argv._[1] || './coverage/coverage-summary.csv';

  if (getExt(source) !== 'json') {
    throw new Error('The source must be a JSON file.');
  }

  if (isFile(target)) {
    target = resolve(process.cwd(), target);
  }

  const coverageFile = fs.readFileSync(source);
  const coverageJson = JSON.parse(coverageFile);
  let coverageCsv = '';
  if (argv.so) {
    if (argv.po) {
      coverageCsv += 'Filename, % Statements\n';
    } else {
      coverageCsv += 'Filename, % Statements, Statements\n';
    }
  } else if (argv.po) {
    coverageCsv += 'Filename, % Statements, % Branches, % Functions, % Lines\n';
  } else {
    coverageCsv += 'Filename, % Statements, Statements, % Branches, Branches, % Functions, Functions, % Lines, Lines\n';
  }
  Object.entries(coverageJson).forEach(([key, val]) => {
    const filename = key.replace(/^total$/, 'All Files').replace(new RegExp(`^${process.cwd()}/`), '');
    const st = val.statements;
    const br = val.branches;
    const fn = val.functions;
    const ln = val.lines;
    if (argv.so) {
      if (argv.po) {
        coverageCsv += `${filename}, ${st.pct}\n`;
      } else {
        coverageCsv += `${filename}, ${st.pct}, ${st.covered}/${st.total}\n`;
      }
    } else if (argv.po) {
      coverageCsv += `${filename}, ${st.pct}, ${br.pct}, ${fn.pct}, ${ln.pct}\n`;
    } else {
      coverageCsv += `${filename}, ${st.pct}, ${st.covered}/${st.total}, ${br.pct}, ${br.covered}/${br.total}, ${fn.pct}, ${fn.covered}/${fn.total}, ${ln.pct}, ${ln.covered}/${ln.total}\n`;
    }
  });
  fs.writeFileSync(target, coverageCsv, { recursive: true, flag: 'w' });
  console.log('Conversion to CSV success!');
} catch (err) {
  console.error(err.message || err);
}

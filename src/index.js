#!/usr/bin/env node
import yargs from 'yargs';
import { resolve } from 'path';
import fs from 'fs';
import { getExt, isFile } from './helpers';

const usageText = 'Convert jest coverage report from coverage-summary to csv\n'
                + 'Usage: jest-coverage-to-csv [source] [target] [options]\n'
                + '\n'
                + 'Source  :  Source path for the coverage-summary json input  [string] [default: "./coverage/coverage-summary.json"]\n'
                + 'Target  :  Target path for the coverage-summary csv output  [string] [default: "./coverage/coverage-summary.csv"]';

const { argv } = yargs(process.argv.slice(2))
  .usage(usageText)
  .wrap(null)
  .example('jest-coverage-to-csv')
  .example('jest-coverage-to-csv coverage/coverage-summary.json coverage/coverage-summary.csv')
  .example('yarn test --coverage --coverageReporters=json-summary && jest-coverage-to-csv')
  .options('f', {
    alias: 'filter',
    demandOption: false,
    default: '',
    describe: 'Show only specified column. Available filters: p percentages | s statements | b branches | f functions | l lines',
    type: 'string',
    requiresArg: true,
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v');

try {
  const source = argv._[0] || './coverage/coverage-summary.json';
  let target = argv._[1] || './coverage/coverage-summary.csv';
  const hasFilter = argv.filter !== '' && argv.filter !== 'p';
  const isPercentageOnly = argv.filter.includes('p');
  const isStatementsOnly = hasFilter ? argv.filter.includes('s') : true;
  const isBranchesOnly = hasFilter ? argv.filter.includes('b') : true;
  const isFunctionsOnly = hasFilter ? argv.filter.includes('f') : true;
  const isLinesOnly = hasFilter ? argv.filter.includes('l') : true;

  if (getExt(source) !== 'json') {
    throw new Error('The source must be a JSON file.');
  }

  if (isFile(target)) {
    target = resolve(process.cwd(), target);
  }

  const coverageFile = fs.readFileSync(source);
  const coverageJson = JSON.parse(coverageFile);
  let coverageCsv = [];
  let headers = 'Filename';
  if (isStatementsOnly) headers += isPercentageOnly ? ', % Statements' : ', % Statements, Statements';
  if (isBranchesOnly) headers += isPercentageOnly ? ', % Branches' : ', % Branches, Branches';
  if (isFunctionsOnly) headers += isPercentageOnly ? ', % Functions' : ', % Functions, Functions';
  if (isLinesOnly) headers += isPercentageOnly ? ', % Lines' : ', % Lines, Lines';
  coverageCsv.push(headers);
  Object.entries(coverageJson).forEach(([key, val]) => {
    const filename = key.replace(/^total$/, 'All Files').replace(new RegExp(`^${process.cwd()}/`), '');
    const st = val.statements;
    const br = val.branches;
    const fn = val.functions;
    const ln = val.lines;
    let content = filename;
    if (isStatementsOnly) content += isPercentageOnly ? `, ${st.pct}` : `, ${st.pct}, ${st.covered}/${st.total}`;
    if (isBranchesOnly) content += isPercentageOnly ? `, ${br.pct}` : `, ${br.pct}, ${br.covered}/${br.total}`;
    if (isFunctionsOnly) content += isPercentageOnly ? `, ${fn.pct}` : `, ${fn.pct}, ${fn.covered}/${fn.total}`;
    if (isLinesOnly) content += isPercentageOnly ? `, ${ln.pct}` : `, ${ln.pct}, ${ln.covered}/${ln.total}`;
    coverageCsv.push(content);
  });
  coverageCsv = [
    ...coverageCsv.slice(0, 2),
    ...coverageCsv.slice(2).sort((a, b) => a.localeCompare(b)),
    '',
  ].join('\n');
  fs.writeFileSync(target, coverageCsv, { recursive: true, flag: 'w' });
  console.log('Conversion to CSV success!');
} catch (err) {
  console.error(err.message || err);
}

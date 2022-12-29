# jest-coverage-to-csv

Jest coverage report converter from json to csv

[![Build Status][build-badge]][build-url]
[![version][version-badge]][version-url]
[![downloads][downloads-badge]][downloads-url]
[![MIT License][license-badge]][license-url]

[![contributions welcome][contrib-badge]][contrib-url]
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Usage
1. Install jest-coverage-to-csv
   ```bash
   npm install -g jest-coverage-to-csv
   ```
2. Run this command *inside your directory*
   ```bash
   yarn test --coverage --coverageReporters=json-summary && jest-coverage-to-csv
   ```
   Or use it in your package.json

### Help
```bash
jest-coverage-to-csv --help
```

## Contributing
1. Fork this repo
2. Develop
3. Create pull request
4. Tag [@rizqirizqi](https://github.com/rizqirizqi) for review
5. Merge~~

### Development
```
yarn dev
```

### Test
```
yarn test
```

### Lint
```
yarn lint
```

## License

MIT

[build-badge]: https://img.shields.io/github/actions/workflow/status/rizqirizqi/jest-coverage-to-csv/.github/workflows/test.yml?branch=master&style=flat-square
[build-url]: https://github.com/rizqirizqi/jest-coverage-to-csv/actions
[version-badge]: https://img.shields.io/npm/v/jest-coverage-to-csv.svg?style=flat-square
[version-url]: https://www.npmjs.com/package/jest-coverage-to-csv
[downloads-badge]: https://img.shields.io/npm/dm/jest-coverage-to-csv.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=jest-coverage-to-csv&from=2019-01-01
[license-badge]: https://img.shields.io/npm/l/jest-coverage-to-csv.svg?style=flat-square
[license-url]: https://github.com/rizqirizqi/jest-coverage-to-csv/blob/master/LICENSE

[contrib-badge]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square
[contrib-url]: https://github.com/rizqirizqi/jest-coverage-to-csv/issues
[github-watch-badge]: https://img.shields.io/github/watchers/rizqirizqi/jest-coverage-to-csv.svg?style=social
[github-watch]: https://github.com/rizqirizqi/jest-coverage-to-csv/watchers
[github-star-badge]: https://img.shields.io/github/stars/rizqirizqi/jest-coverage-to-csv.svg?style=social
[github-star]: https://github.com/rizqirizqi/jest-coverage-to-csv/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20Jest%20coverage%20report%20converter%20from%20json%20to%20csv!%20https%3A%2F%2Fgithub.com%2Frizqirizqi%2Fjest-coverage-to-csv
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/rizqirizqi/jest-coverage-to-csv.svg?style=social

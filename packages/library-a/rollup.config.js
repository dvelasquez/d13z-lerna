import rollupBase from '../../rollup/rollup.base.config.js';
import pkg from './package.json' assert { type: 'json' };
import { cwd } from 'process';

const config = rollupBase({
  cwd: cwd(),
  entry: 'lib/index.ts',
  libraryName: 'libraryA',
  minify: false,
  external: [],
  pkg,
});

export default config;

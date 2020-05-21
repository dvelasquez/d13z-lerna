import path from 'path'
import rollupBase from '../../rollup/rollup.base.config'

const pkg = require('./package.json')
const cwd = path.resolve(__dirname)

const config = rollupBase({
    cwd,
    entry: 'lib/index.ts',
    libraryName: 'libraryA',
    minify: false,
    external: [],
    pkg,
})

export default config

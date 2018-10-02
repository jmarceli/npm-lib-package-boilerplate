import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import flow from 'rollup-plugin-flow';

// @param targets - object targets to build for e.g. { node: '6' }
// see https://babeljs.io/docs/en/babel-preset-env#targets
const plugins = targets => ([
  flow(),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      ['env', { modules: false, targets }],
    ],
    plugins: ['babel-plugin-transform-object-rest-spread'],
    comments: false,
  }),
  copy({
    files: ['src/*.flow'],
    dest: 'lib',
  }),
]);

const external = [];

export default [{
  input: 'src/index.js',
  output: {
    name: 'npmLibPackageExample',
    file: 'lib/index.esm.js',
    format: 'esm',
    sourcemap: true,
  },
  external,
  plugins: plugins({ node: '8' }),
}, {
  input: 'src/index.js',
  output: {
    name: 'npmLibPackageExample',
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external,
  plugins: plugins({ node: '6' }),
}];

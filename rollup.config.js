import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import flow from 'rollup-plugin-flow';

const plugins = [
  flow(),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [['env', { modules: false }]],
    plugins: [['transform-object-rest-spread', { useBuiltIns: true }]],
  }),
  copy({
    files: ['src/*.flow'],
    dest: 'lib',
  }),
];

const external = ['axios', 'qs'];

export default [{
  input: 'src/index.js',
  output: {
    name: 'ES6 Module',
    file: 'lib/index.esm.js',
    format: 'esm',
    sourcemap: true,
  },
  external,
  plugins,
}, {
  input: 'src/index.js',
  output: {
    name: 'CommonJS',
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  external,
  plugins,
}];

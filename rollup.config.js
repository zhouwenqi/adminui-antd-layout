const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts').default;
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');

const name = 'index';

module.exports = [
  // 1. JS bundles
  {
    input: 'src/index.ts',
    output: [
      { file: `dist/${name}.esm.js`, format: 'es' },
      { file: `dist/${name}.cjs.js`, format: 'cjs' },
    ],
    external: ['react', 'react-dom','antd','@ant-design/colors','@ant-design/icons','react-intl','react-router','react-router-dom'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        modules: true, 
        autoModules: true, 
        inject: true,
      }),
    ],
  },

  // 2. .d.ts declaration files
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
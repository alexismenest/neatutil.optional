import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    external: [
      'lodash.isequal'
    ],
    output: [
      { file: './dist/index.esm.js', format: 'es', sourcemap: true }, 
      { file: './dist/index.mjs', format: 'es', sourcemap: true }
    ],
    plugins: [
      typescript({
        "module": "ESNext",
        "declaration": false,
        "declarationMap": false
      })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      name: 'NeatUtilOptional',
      file: './dist/index.umd.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        "target": "ES2018",
        "module": "ESNext",
        "declaration": false,
        "declarationMap": false
      })
    ]
  }
];

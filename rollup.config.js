/* eslint-disable import/no-anonymous-default-export */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import typescript from '@rollup/plugin-typescript';
import svgr from '@svgr/rollup';

import postcssCustomProperties from 'postcss-custom-properties';
import postcssCalc from 'postcss-calc';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      plugins: [
        postcssCustomProperties({
          preserve: false,
          importFrom: [
            'src/shared/colors.css',
            'src/shared/buttons.css',
            'src/shared/sizing.css',
            'src/shared/variables.css',
          ],
        }),
        postcssCalc(),
      ],
      minimize: {
        zindex: false,
      },
      modules: {
        getJSON() {},
        generateScopedName: 'rvr-[sha256:hash:base64:3]',
        hashPrefix: 'prefix',
      },
      sourceMap: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['transform-es2017-object-entries', 'external-helpers'],
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    typescript(),
    commonjs({
      include: 'node_modules/**',
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      namedExports: {
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),
  ],
};

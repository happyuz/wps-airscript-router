import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/index.js',
            format: 'cjs'
        },
        plugins: [
            typescript(),
            nodeResolve(),
            commonjs()
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/index.js',
            format: 'es'
        },
        plugins: [
            typescript(),
            nodeResolve(),
            commonjs()
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/browser/index.js',
            format: 'iife',
            name: 'AppFactory'
        },
        plugins: [
            typescript(),
            nodeResolve(),
            commonjs(),
            terser()
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];
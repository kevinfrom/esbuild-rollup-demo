const esbuild = require('esbuild')
const {sassPlugin} = require('esbuild-sass-plugin')
const {lessLoader} = require('esbuild-plugin-less')

const defaultOptions = {
    bundle: true,
    minify: true,
    format: 'iife'
}

Promise.all([
    esbuild.build({
        entryPoints: ['src/index.js'],
        outfile: 'dist/esbuild-js.min.js',
        ...defaultOptions
    }),
    esbuild.build({
        entryPoints: ['src/index.ts'],
        outfile: 'dist/esbuild-ts.min.js',
        ...defaultOptions
    }),
    esbuild.build({
        entryPoints: ['src/index.scss'],
        outfile: 'dist/esbuild-scss.min.css',
        plugins: [sassPlugin()],
        ...defaultOptions
    }),
    esbuild.build({
        entryPoints: ['src/index.less'],
        outfile: 'dist/esbuild-less.min.css',
        plugins: [lessLoader()],
        ...defaultOptions
    })
])
    .then(() => console.log('ESBuild finished'))
    .catch(err => console.error(`ESBuild error: ${err}`))

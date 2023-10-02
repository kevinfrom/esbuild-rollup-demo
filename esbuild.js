const esbuild = require('esbuild')
const {sassPlugin} = require('esbuild-sass-plugin')
const {lessLoader} = require('esbuild-plugin-less')

const defaultOptions = {
    bundle: true,
    minify: true,
    format: 'iife'
}

/**
 *
 * @param name {string}
 * @param fn {Promise}
 * @returns {Promise<void>}
 */
const measure = async (name, fn) => {
    const start = performance.now()
    await fn
    console.log(`time: ${name} took ${performance.now() - start}ms`)
}

Promise.all([
    measure('js', esbuild.build({
        entryPoints: ['src/index.js'],
        outfile: 'dist/esbuild-js.min.js',
        ...defaultOptions
    })),
    measure('ts', esbuild.build({
        entryPoints: ['src/index.ts'],
        outfile: 'dist/esbuild-ts.min.js',
        ...defaultOptions
    })),
    measure('scss', esbuild.build({
        entryPoints: ['src/index.scss'],
        outfile: 'dist/esbuild-scss.min.css',
        plugins: [sassPlugin()],
        ...defaultOptions
    })),
    measure('less', esbuild.build({
        entryPoints: ['src/index.less'],
        outfile: 'dist/esbuild-less.min.css',
        plugins: [lessLoader()],
        ...defaultOptions
    }))
])
    .then(() => console.log('ESBuild finished'))
    .catch(err => console.error(`ESBuild error: ${err}`))

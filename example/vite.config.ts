const inject = require('@rollup/plugin-inject')

module.exports = async () => {
  const { default: stdLibBrowser } = await import('node-stdlib-browser')
  return {
    resolve: {
      alias: stdLibBrowser
    },
    optimizeDeps: {
      include: ['buffer', 'process'],
      esbuildOptions: {
        entryPoints: ['./indexx.tsx'],

      }
    },
    root: './public',
    plugins: [
      {
        ...inject({
          global: [
            require.resolve(
              'node-stdlib-browser/helpers/esbuild/shim'
            ),
            'global'
          ],
          process: [
            require.resolve(
              'node-stdlib-browser/helpers/esbuild/shim'
            ),
            'process'
          ],
          Buffer: [
            require.resolve(
              'node-stdlib-browser/helpers/esbuild/shim'
            ),
            'Buffer'
          ]
        }),
        enforce: 'post'
      }
    ]
  }
}

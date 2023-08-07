import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from 'node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {

    commonjsOptions: { include: [] },
    
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
      }),
      NodeModulesPolyfillPlugin()
      ],
    },
  },
  resolve:{
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
      https: 'agent-base',
      zlib: 'browserify-zlib',
    },
  }
})

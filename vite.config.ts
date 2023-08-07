import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from 'node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import inject from '@rollup/plugin-inject'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [ 'react', 'react-is', 'react-router', 'react/jsx-runtime', 'react-dom' , "zustand", "pusher-js", "file-saver","prop-types","*", "hoist-non-react-statics"
    , "process","shallowequal","react-dom/client"
    ],
      
      plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          rollupNodePolyFill()
      ]
  },
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
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
    },
  }
})

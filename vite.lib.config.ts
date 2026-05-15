import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    outDir: 'dist/lib',
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: resolve(__dirname, 'src/public/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'chroma-js',
        'juice',
        'qrcode-generator',
        /^markdown-it($|\/)/,
        /^markdown-it-/,
        /^highlight\.js($|\/)/,
      ],
      output: {
        preserveModules: false,
      },
    },
  },
})

// vite.config.ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import conditionalImport from 'vite-plugin-conditional-import';

export default defineConfig(() => { 
  const isUmdBuild = process.env.VITE_BUILD_FORMAT === 'umd';
  const isEs = process.env.VITE_BUILD_FORMAT === 'es';
  return {
    define: {
      'process.env': {
        TARGET: process.env.TARGET,
        BROWSER: process.env.VITE_BUILD_FORMAT === 'umd' || process.env.VITE_BUILD_FORMAT === 'es',
        FORMAT: process.env.VITE_BUILD_FORMAT
      }
    },
    build: {
      minify: false,
      lib: {
        entry: 'src/index.ts', // Your main entry point for the library
        name: 'EchoDB',
        fileName: (format) => `echodb.${format}.js`,
        formats: ['es', 'cjs'], // Output both ES Module and CommonJS formats
      },
      // Optional: Exclude Node.js built-in modules from being bundled
      // For example, if your library uses 'path' or 'fs'
      rollupOptions: {
        external: ['path', 'fs', 'dns'], 
      },
    },
    plugins: [
      conditionalImport({
        currentEnv: isUmdBuild || isEs ? 'client' : 'server',
        envs:['client', 'server']
      }),
      dts({ rollupTypes: true })
    ]
  }
});
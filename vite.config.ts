import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT || '5173')
      },
      preview: {
        host: '0.0.0.0',
        port: parseInt(process.env.PORT || '5173'),
        strictPort: true
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser'
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

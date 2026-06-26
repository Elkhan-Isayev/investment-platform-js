import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The project keeps JSX inside plain `.js` files (legacy CRA layout), so we
// teach esbuild to treat every `.js` under src/ as JSX.
export default defineConfig({
  // Served from https://<user>.github.io/investment-platform-js/ on GitHub Pages.
  base: '/investment-platform-js/',
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

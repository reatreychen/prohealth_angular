import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['aos/dist/aos.css']
  }
});


import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // keep '/' since you use a custom domain
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        team:     resolve(__dirname, 'team.html'),
        forms:    resolve(__dirname, 'forms.html'),
      },
    },
  },
});

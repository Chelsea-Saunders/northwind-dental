import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // keep '/' since you use a custom domain
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        team:     resolve(__dirname, 'team.html'),
        forms:    resolve(__dirname, 'forms.html'),
        // 5 pdf related pages
        cancelPdf: resolve(__dirname, 'cancel-pdf.html'),
        healthformPdf: resolve(__dirname, 'hf-pdf.html'),
        newpatientPdf: resolve(__dirname, 'np-pdf.html'),
        hipaaPdf: resolve(__dirname, 'hipaa-pdf.html'),
        hipaaPolicy: resolve(__dirname, 'hipaa-policy.html'),
      },
    },
  },
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://lyonkabel.github.io',
  base: "/webdeployment-assignment-api/"
});

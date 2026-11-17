import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração mínima do Vite para um projeto React.
// O build sai na pasta "dist" — é esse o nome que o Netlify pede
// no campo "Publish directory".
export default defineConfig({
  plugins: [react()],
});

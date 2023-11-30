import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Your backend host URL
// const backendHost = 'http://localhost:5000';
const backendHost = 'lokeshwar-attendance-backend.onrender.com';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendHost,
        changeOrigin: true,
      },
    },
    host: '0.0.0.0',
  },
});

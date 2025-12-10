import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // rewrite 제거: 백엔드가 /api/todos를 사용하므로 /api를 유지해야 함
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('프록시 오류:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('프록시 요청:', req.method, req.url);
          });
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    /** Escuta em todas as interfaces: http://localhost:5173 e http://127.0.0.1:5173 */
    host: true,
    port: 5173,
    strictPort: true,
  },
})


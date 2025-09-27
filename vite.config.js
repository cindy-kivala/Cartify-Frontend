import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // List dependencies here that should be treated as external
      external: [
        'react-hot-toast',   // toast notifications
        'axios',             // if you use axios for API calls
        'react-router-dom',  // routing library
        'react',             // react itself (optional for some setups)
        'react-dom'          // react-dom (optional for some setups)
      ],
    },
  },
})

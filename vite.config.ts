import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/idsb-prototype/' : '/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@mantine/core', '@mantine/hooks'],
    alias: [
      { find: '@mantine/notifications/styles.css', replacement: path.resolve(__dirname, 'src/mantine-notifications-mock.css') },
      { find: '@mantine/notifications', replacement: path.resolve(__dirname, 'src/mantine-notifications-mock.ts') },
    ],
  },
})

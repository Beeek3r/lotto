/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port: process.env.PORT ? parseInt(process.env.PORT) : 3333, host: true},
  test: {
      globals: true,
      environment: 'jsdom',
      css: true,
  },
  base: '/lotto/'
})

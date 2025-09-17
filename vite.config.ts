import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/mixins/index.scss";`,
        sassOptions: {
          outputStyle: 'compressed',
        },
      },
    },
  },
  server: {
		proxy: {
			'/api': {
				target: 'http://185.137.233.105:8081/',
				changeOrigin: true,
				autoRewrite: true,
			},
		},
	},
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Увеличиваем лимит до 1600кб, чтобы убрать предупреждение
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Разделяем тяжелые зависимости на отдельные чанки
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})

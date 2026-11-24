import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Firebase Hosting 이 build/ 폴더를 배포하므로 출력 폴더를 맞춥니다.
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'build' },
})

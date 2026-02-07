import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from 'child_process'

// Get git commit date
function getGitCommitDate() {
  try {
    const timestamp = execSync('git log -1 --format=%ct').toString().trim()
    const date = new Date(parseInt(timestamp) * 1000)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}.${month}`
  } catch (e) {
    // Fallback to current date if git is not available
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}.${month}`
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __GIT_COMMIT_DATE__: JSON.stringify(getGitCommitDate())
  }
})

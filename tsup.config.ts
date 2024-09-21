import { defineConfig } from "tsup"
export default defineConfig({
  // entry: ["src", "!src/views/**/*.html"]
	external: ['src/views/**/*.html'], 
  loader: {
    '.html': 'file', 
  },
	ignoreWatch: ['src/views/**/*.html']
});
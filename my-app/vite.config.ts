import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(), 
        tailwindcss()
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("recharts")) return "recharts";
                        if (id.includes("react")) return "react-vendor";
                        return "vendor";
                    }
                },
            },
        },
    },
});

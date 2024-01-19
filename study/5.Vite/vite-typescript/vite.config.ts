import {defineConfig} from "vite";
import checker from 'vite-plugin-checker'

// { command, mode, isSsrBuild, isPreview }
export default defineConfig(() => {
    return {
        plugins: [checker({
            typescript: true
        })]
    }
})

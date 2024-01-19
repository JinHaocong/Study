import {defineConfig} from "vite";
import {Plugin as importToCDN} from "vite-plugin-cdn-import";

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
    return {
        plugins: [
            importToCDN({
                modules: [
                    {
                        name: 'lodash',
                        var: '_',
                        path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`,
                    },
                ],
            }),
        ],
    }
})

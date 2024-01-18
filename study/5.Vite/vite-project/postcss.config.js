import postcssPresetEnv from 'postcss-preset-env'

import path from 'path'

module.exports = {
    plugins: [
        postcssPresetEnv({
            importFrom: path.resolve(__dirname, './variable.css')
        })
    ]
}

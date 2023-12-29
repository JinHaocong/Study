const fs = require('fs');
const path = require('path');

class CleanWebpackPlugin {
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('CleanWebpackPlugin', (compilation, callback) => {
            const outputPath = compiler.options.output.path;
            this.removeFiles(outputPath);
            callback();
        });
    }

    removeFiles(filepath) {
        const files = fs.readdirSync(filepath);

        files.forEach((file) => {
            const fullPath = path.join(filepath, file);
            const fileStat = fs.statSync(fullPath);

            if (fileStat.isDirectory()) {
                this.removeFiles(fullPath);
            } else {
                fs.unlinkSync(fullPath);
            }
        });

        fs.rmdirSync(filepath);
    }
}

module.exports = CleanWebpackPlugin;

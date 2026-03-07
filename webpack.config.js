import path from "node:path";
import { fileURLToPath } from "node:url";
import { cpSync } from "node:fs";

// In Node.js versions prior to native support for import.meta.dirname,
// derive __dirname from import.meta.url.
// (Node 20.11+ supports import.meta.dirname and import.meta.filename.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CopyFilesPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('CopyFilesPlugin', () => {
            // Copy index.html
            cpSync(
                path.resolve(__dirname, 'index.html'),
                path.resolve(__dirname, 'dist/index.html')
            );
            // Copy static folder
            cpSync(
                path.resolve(__dirname, 'static'),
                path.resolve(__dirname, 'dist/static'),
                { recursive: true }
            );
        });
    }
}

export default {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist/"),
        publicPath: './',
        clean: true,
    },
    plugins: [
        new CopyFilesPlugin()
    ]
};
import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from 'html-webpack-plugin';

// In Node.js versions prior to native support for import.meta.dirname,
// derive __dirname from import.meta.url.
// (Node 20.11+ supports import.meta.dirname and import.meta.filename.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        new HtmlWebpackPlugin({
            template: './index.html', // Point this to your SOURCE index.html
        }),
    ],
};
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    plugins: [vue(), vueJsx(), svgLoader({ svgoConfig: {} })],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, '../src'),
            },
            {
                find: 'assets',
                replacement: resolve(__dirname, '../src/assets'),
            },
            {
                find: 'vue-i18n',
                replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
            },
            {
                find: 'vue',
                replacement: 'vue/dist/vue.esm-bundler.js', // compile template
            },
        ],
        extensions: ['.ts', '.js'],
    },
    define: {
        'process.env': {},
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/devApi': {
                // target: 'http://localhost:8081/tixin_web_war_exploded/v1.2/api',
                target: 'http://47.92.133.154:18081/v1.2/api',                
				changeOrigin: true,
                rewrite: path => path.replace(/^\/devApi/, '')
            },
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve(
                        'src/assets/style/breakpoint.less'
                    )}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
});

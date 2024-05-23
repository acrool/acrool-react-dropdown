import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import * as path from 'node:path';
import {visualizer} from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isDev = env.NODE_ENV !== 'production';

    return {
        plugins: [
            eslint(),
            react(),
            dts({
                insertTypesEntry: true,
            }),
            visualizer() as Plugin,
        ],
        css: {
            modules: {
                localsConvention: 'camelCase',
                scopeBehaviour: 'local',
                generateScopedName: 'acrool-react-dropdown__[name]__[local]',
            }
        },
        build: {
            sourcemap: isDev,
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),
                formats: ['es'],
                fileName: (format) => `bear-react-dropdown.${format}.js`,
            },
            cssTarget: 'chrome61',
            rollupOptions: {
                external: ['react', 'react-dom'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
        },
    };
});


import esbuild from 'rollup-plugin-esbuild';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/wechat-adapter.js',
      format: 'umd',
      name: 'wechat-adapter.js',
      sourcemap: true,
    },
  ],
  plugins: [
    esbuild({
      include: /\.js?$/,
      exclude: /node_modules/,
      sourceMap: true,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015',
      jsx: 'transform',
      define: {
        __VERSION__: '"x.y.z"',
      },
      minifySyntax: true,
      minifyWhitespace: true,
      minifyIdentifiers: true,
    }),
    common(),
    resolve(),
  ],
};

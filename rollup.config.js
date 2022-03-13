import * as fs from 'fs';
import path from 'path';

import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

function isDev() {
  return !!process.argv.find(el => el === '--config-dev');
}

function isDir(dir) {
  return fs.lstatSync(dir).isDirectory();
}

const dir = 'packages';

let folder = fs
  .readdirSync(dir)
  .map(el => {
    return {
      path: path.join(dir, el),
      folder: el,
    };
  })
  .filter(el => isDir(el.path));

export default folder.map(el => {
  return {
    input: path.join(el.path, 'index.ts'),
    output: {
      dir: path.resolve(__dirname, `dist/${el.folder}`),
      format: 'es',
      name: el.folder,
      sourcemap: isDev(),
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
      }),
      !isDev() ? terser() : null,
    ],
  };
});

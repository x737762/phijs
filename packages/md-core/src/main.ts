import { parse } from './parse';
import { preprocess } from './preprocess';

// 默认配置
const defaultOptions: FMOptions = {
  encoding: 'utf8',
  yaml: false,
  retainWrap: false,
};

export function fromMarkdown(
  value: string | Buffer,
  options: FMOptions = defaultOptions,
) {
  let sources: string;
  if (Buffer.isBuffer(value)) {
    sources = value.toString(options.encoding);
    return compiler(sources, options);
  } else {
    return compiler(value, options);
  }
}

/**
 * 1. 把 md 解析成 chunks 数组
 * 2. 把 chunks 数组解析成 tokens 数组
 * 3. 把 tokens 数组转换成 mdast
 */

function compiler(sources: string, options: FMOptions) {
  // let chunks = preprocess(sources, options.retainWrap);
  let chunks = preprocess(sources, true);
  chunks.forEach(el => console.log(el));
}

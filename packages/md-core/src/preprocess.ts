const search = /[\n\r]/g;

export function preprocess(value: string, retainWrap: boolean): Chunk[] {
  const chunks: Chunk[] = [];
  const len = value.length;
  let startPosition = 0;
  let endPosition: number;
  let code: number;
  let match: RegExpExecArray | null;
  let row = 0;
  let offset = 0;
  let column = 0;

  while (startPosition < len) {
    search.lastIndex = startPosition;
    match = search.exec(value);
    endPosition = match && match.index !== undefined ? match.index : len;

    // 列和偏移量
    offset = endPosition + 1;
    column = endPosition - startPosition + 1;

    // 判断当前是第几行
    code = value.charCodeAt(endPosition);
    if (
      (code === 13 && value.charCodeAt(offset) === 10) || // windows 的换行 \r\n
      (code === 10 && value.charCodeAt(endPosition - 1)) // linux 的换行 \n
    ) {
      row++;
    }

    // 处理内容
    if (startPosition < endPosition) {
      chunks.push({
        value: value.slice(startPosition, endPosition),
        position: { column, row, offset },
      });
    }

    // 处理换行
    if (retainWrap) {
      switch (code) {
        // \n
        case 10:
          chunks.push({
            value: '-10',
            position: { column, row, offset },
          });
          break;
        // \r
        case 13:
          chunks.push({
            value: '-13',
            position: { column, row, offset },
          });
          break;
      }
    }
    startPosition = endPosition + 1;
  }

  return chunks;
}

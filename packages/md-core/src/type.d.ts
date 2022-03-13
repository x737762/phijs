interface FMOptions {
  encoding: BufferEncoding;
  yaml: boolean;
  retainWrap: boolean;
}

interface Chunk {
  value: string;
  position: {
    row: number;
    column: number;
    offset: number;
  };
}

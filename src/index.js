// import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';

class GenDiff {
  constructor(file1, file2, format = null) {
    this.format = format;
    this.files = [];

    try {
      [file1, file2].forEach((file) => {
        const filePath = path.resolve(process.cwd(), file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const type = /(?:\.([^.]+))?$/.exec(filePath)[1];
        this.files.push({
          filePath,
          content,
          type,
          parsed: parseFile(content, type),
        });
      });
    } catch (e) {
      throw new Error(`Failed to read files: ${e}`);
    }
  }

  toString() {
    console.log(JSON.stringify(this.files, 0, 1));
  }
}

export default GenDiff;

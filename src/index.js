import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parser from './parser.js';
import getFormat from './formatters/index.js';

const getPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = getPath(filepath1);
  const absolutePath2 = getPath(filepath2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const parsedFile1 = parser(content1, filepath1.split('.')[1]);
  const parsedFile2 = parser(content2, filepath2.split('.')[1]);

  const differences = getFormat(compareData(parsedFile1, parsedFile2), formatName);
  return differences;
};

export default genDiff;

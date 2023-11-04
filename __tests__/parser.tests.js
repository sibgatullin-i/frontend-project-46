import { test, expect } from '@jest/globals';
import fs from 'fs';
// import path from 'path';
import { parseFile } from '../src/parser.js';

const expected1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const content1 = fs.readFileSync('__fixtures__/file1.json', 'utf-8');

test('file1.json', () => {
  const result1 = parseFile(content1, 'json');
  expect(result1).toEqual(expected1);
});

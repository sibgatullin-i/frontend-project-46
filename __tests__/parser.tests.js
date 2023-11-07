import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
// import path from 'path';
import { parseFile } from '../src/parser.js';

describe('parse files', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const content1 = fs.readFileSync('__fixtures__/file1.json', 'utf-8');
  const content2 = fs.readFileSync('__fixtures__/file1.yml', 'utf-8');

  test('file1.json', () => {
    const result1 = parseFile(content1, 'json');
    expect(result1).toEqual(expected);
  });

  test('file1.yml', () => {
    const result1 = parseFile(content2, 'yml');
    expect(result1).toEqual(expected);
  });
});

import { describe, test, expect } from '@jest/globals';
import GenDiff from '../src/GenDiff.js';

const file2 = './__fixtures__/file2.json';
const file1 = './__fixtures__/file1.yml';
const file3 = './__fixtures__/file1.json';

const expected1 = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
`;

const expected2 = `
{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}
`;

describe('flat files', () => {
  const genDiff1 = new GenDiff(file1, file2);
  const genDiff2 = new GenDiff(file3, file1);

  test('yaml vs json', () => {
    const result = genDiff1.flatDiffString;
    expect(result).toMatch(expected1);
  });

  test('no diff', () => {
    const result = genDiff2.flatDiffString;
    expect(result).toMatch(expected2);
  });
});

import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const parentDir = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(parentDir, '..', '__fixtures__', filename);
const readFile = (file) => {
  const filePath = getFixturePath(file);
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

const firstJSON = getFixturePath('file1.json');
const secondJSON = getFixturePath('file2.json');
const firstYML = getFixturePath('file1.yml');
const secondYML = getFixturePath('file2.yml');

const expectedStylish = readFile('resultStylish.txt').trim();
const expectedPlain = readFile('resultPlain.txt').trim();
const expectedJSON = readFile('resultJSON.txt').trim();

test('#1 difference stylish format test between JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'stylish')).toEqual(expectedStylish);
});

test('#2 difference stylish format test between YML files', () => {
  expect(genDiff(firstYML, secondYML, 'stylish')).toEqual(expectedStylish);
});

test('#3 difference plain format test between JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'plain')).toEqual(expectedPlain);
});

test('#4 difference plain format test between YML files', () => {
  expect(genDiff(firstYML, secondYML, 'plain')).toEqual(expectedPlain);
});

test('#5 difference json format test between JSON files', () => {
  expect(genDiff(firstJSON, secondJSON, 'json')).toEqual(expectedJSON);
});

test('#6 difference json format test between YML files', () => {
  expect(genDiff(firstYML, secondYML, 'json')).toEqual(expectedJSON);
});

test('#7 difference default format test between JSON files', () => {
  expect(genDiff(firstJSON, secondJSON)).toEqual(expectedStylish);
});

test('#8 difference default format test between YML files', () => {
  expect(genDiff(firstYML, secondYML)).toEqual(expectedStylish);
});

test('#9 difference default format test between JSON and YML files', () => {
  expect(genDiff(firstJSON, secondYML)).toEqual(expectedStylish);
});

test('#10 difference plain format test between YML and JSON files', () => {
  expect(genDiff(firstYML, secondJSON, 'plain')).toEqual(expectedPlain);
});

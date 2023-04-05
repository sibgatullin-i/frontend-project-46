import { readFileSync } from 'fs';
import path from 'path';
import process from 'node:process';
import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

export const readFile = (pathToFile) => JSON.parse(readFileSync(path.resolve(process.cwd(), pathToFile), { encoding: 'utf8', flag: 'r' }));

export const genDiff = (data1, data2) => {
  const commonKeys = _.intersection(Object.keys(data1), Object.keys(data2));
  const deletedKeys = _.difference(Object.keys(data1), Object.keys(data2));
  const addedKeys = _.difference(Object.keys(data2), Object.keys(data1));
  const diffResult = {};

  commonKeys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === value2) {
      diffResult[key] = {
        status: 'unchanged',
        value: value1,
      };
    } else {
      diffResult[key] = {
        status: 'changed',
        value: [value1, value2],
      };
    }
  });

  deletedKeys.forEach((key) => {
    diffResult[key] = {
      status: 'deleted',
      value: data1[key],
    };
  });

  addedKeys.forEach((key) => {
    diffResult[key] = {
      status: 'added',
      value: data2[key],
    };
  });

  return diffResult;
};

export const toString = (obj, spaces = 2) => {
  const keys = Object.keys(obj).sort();
  const indent = ' '.repeat(spaces);

  const str = keys.reduce((res, key) => {
    let result = res;
    const [status] = [obj[key].status];

    if (obj[key].status === 'changed') {
      const [value1, value2] = [obj[key].value[0], obj[key].value[1]];
      result += `${indent}${symbols.deleted} ${key}: ${value1}\n`;
      result += `${indent}${symbols.added} ${key}: ${value2}\n`;
    } else {
      result += `${indent}${symbols[status]} ${key}: ${obj[key].value}\n`;
    }
    return result;
  }, '');

  // return `{\n${str}}`;
  console.log(`{\n${str}}`);
};
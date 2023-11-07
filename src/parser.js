import jsYaml from 'js-yaml';
import _ from 'lodash';

const parseFile = (filepath, type) => {
  if (type === 'json') {
    return JSON.parse(filepath);
  }

  if (type === 'yml' || type === 'yaml') {
    return jsYaml.load(filepath);
  }

  return {};
};

const flatDiff = (obj1, obj2) => {
  const resultObject = [];
  _.union(Object.keys(obj1), Object.keys(obj2)).forEach((key) => {
    if (Object.keys(obj1).includes(key) && Object.keys(obj2).includes(key)) {
      if (obj1[key] === obj2[key]) {
        resultObject.push([' ', key, obj1[key]]);
      } else {
        resultObject.push(['-', key, obj1[key]]);
        resultObject.push(['+', key, obj2[key]]);
      }
    }
    if (Object.keys(obj1).includes(key) && !Object.keys(obj2).includes(key)) {
      resultObject.push(['-', key, obj1[key]]);
    }
    if (!Object.keys(obj1).includes(key) && Object.keys(obj2).includes(key)) {
      resultObject.push(['+', key, obj2[key]]);
    }
  });

  const result = resultObject
    .sort((a, b) => {
      if (a[1] < b[1]) {
        return -1;
      }
      return 1;
    })
    .map((item) => `  ${item[0]} ${item[1]}: ${item[2]}`);

  return `\n{\n${result.join('\n')}\n}\n`;
};

const buildASTTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        status: 'added',
        value: value2,
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        status: 'deleted',
        value: value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        name: key,
        status: 'nested',
        children: buildASTTree(value1, value2),
      };
    }

    if (value1 === value2) {
      return {
        name: key,
        status: 'unchanged',
        value: value1,
      };
    }

    return {
      name: key,
      status: 'modified',
      valueBefore: value1,
      valueAfter: value2,
    };
  });

  return result;
};

export { parseFile, flatDiff, buildASTTree };

import jsYaml from 'js-yaml';

const parseFile = (filepath, type) => {
  if (type === 'json') {
    return JSON.parse(filepath);
  }

  if (type === 'yml' || type === 'yaml') {
    return jsYaml.load(filepath);
  }

  return {};
};

export default parseFile;

import goodView from './stylish.js';
import plain from './plain.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return goodView(data, 0);
    case 'json':
      return JSON.stringify(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormat;

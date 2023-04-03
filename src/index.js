import { readFileSync } from 'fs';
import path from 'path';
import process from 'node:process';
import _ from 'lodash';

const symbols = {
  added: '+>',
  deleted: '<-',
  unchanged: '==',
};
#!/usr/bin/env node

import { Command } from 'commander';
import GenDiff from './src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = new GenDiff(filepath1, filepath2, program.opts().format = null);
    console.log(diff.toString(0));
  })
  .option('-f, --format <type>', 'output format'/* , 'stylish' */);

program.parse();

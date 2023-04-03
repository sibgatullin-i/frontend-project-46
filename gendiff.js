#!/usr/bin/env node
import { Command } from 'commander';
import * as DiffFn from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    DiffFn.toString(DiffFn.genDiff(DiffFn.readFile(filepath1), DiffFn.readFile(filepath2)));
  });
program.parse();
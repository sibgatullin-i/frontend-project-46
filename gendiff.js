#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program.parse();

const genDiff = () => { console.log('coming soon') };

genDiff();
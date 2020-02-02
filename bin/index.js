#!/usr/bin/env node

const vCLI = require('commander')
const ff = require('../lib/ff/')
const li = require('../lib/li/')

vCLI
  .command('ff')
  .action(ff)
  .option('-e <type>', 'Specify type of file extension', 'tsx')
  .option('-w <keyword>', 'Specify keyword in file', 'React')
  .option('-c', 'Specifies if filename could be lower case', 'true')
  .description('Find files in path.')

vCLI
  .command('li')
  .action(li)
  .option('-e <type>', 'Specify type of file extension', 'tsx')
  .option('-w <keyword>', 'Specify keyword in file', 'React')
  .description('List imports.')

vCLI.parse(process.argv)

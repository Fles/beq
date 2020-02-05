#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { ignoreDirs, ignoreFiles } = require('../ignores')

const imports = (filePath, showFilePath) => {
  showFilePath && console.log(':::::: ' + filePath)
  return fs
    .readFileSync(path.resolve(filePath), 'utf-8')
    .match(
      /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm
    )
}

async function fi(extension, showFilePath) {
  const {
    stdout,
    stderr,
  } = await exec(
    `find . -name "*.${extension}" ${ignoreFiles.reduce(
      (_, file) => `${_} ! -name "*${file}*"`,
      ''
    )} ${ignoreDirs.reduce(
      (_, dir) => `${_} ! -path "*${dir}*"`,
      ''
    )} -not -type d`,
    { maxBuffer: 1024 * 500 }
  )

  if (stderr) console.error(`error: ${stderr}`)

  const res = stdout
    .split('\n')
    .filter((_) => _)
    .filter((_) => {
      return _
    })
    .flatMap((_) => imports(_, showFilePath))
    .join('\n')
  console.log(res)
}

module.exports = ({ E, F }) => fi(E, F)

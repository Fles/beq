#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { ignoreDirs, ignoreFiles } = require('../ignores')

const imports = (filePath) => {
  const oo =
    filePath &&
    fs
      .readFileSync(path.resolve(filePath), 'utf-8')
      .match(
        /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm
      )
  return oo
}

async function fi(extension) {
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
    .flatMap((_) => {
      const imp = imports(_)
      if (imp === null) return
      return [`:::::: ${_}`, imp]
    })
    .flatMap((_) => _)
    .filter((_) => _)
    .join('\n')

  console.log(res)
}

module.exports = ({ E, F }) => fi(E, F)

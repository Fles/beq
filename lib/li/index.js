#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const sync = require('child_process').spawnSync
const { ignoreDirs, ignoreFiles } = require('../ignores')
const { findAllFiles } = require('../../common/shell')

const readImports = filePath =>
  fs
    .readFileSync(path.resolve(filePath), 'utf-8')
    .match(
      /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm
    )

function fi(extension, filePaths) {
  var ls = sync('find', ['.', '-name', '"*.tsx"'])
  var grep = sync('find', ['.', '-name "*.tsx"'], {
    input: ls.stdout,
  })

  process.on('exit', function() {
    console.log(grep.stdout.toString())
  })

  /*   const { stdout, stderr } = exec(
    findAllFiles(extension, ignoreFiles, ignoreDirs),
    { maxBuffer: 1024 * 500 }
  ).then

  if (stderr) console.error(`error: ${stderr}`)

  const res = stdout */
  /*     .split('\n')
    .filter(_ => _)
    .flatMap(readImports)
    .flatMap(_ => _)
    .join('\n') */

  /* 
    .flatMap((_) => {
      const imp = readImports(_)
      if (imp === null) return
      return [`- >>> ${_}`, imp]
    })
    .flatMap((_) => _)
    .filter((_) => _)
    .join('\n') */

  //console.log(res)
}

module.exports = ({ E, F }) => fi(E, F)

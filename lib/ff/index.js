#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { ignoreDirs, ignoreFiles } = require('../ignores')
const { findAllFiles } = require('../../common/shell')

var reg = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm

const includesKeyword = (keyword, filePath) =>
  fs
    .readFileSync(path.resolve(filePath), 'utf-8')
    .split('\n')
    .some((line) => line.includes(keyword))

async function ff(extension, keyword) {
  const { stdout, stderr } = await exec(
    findAllFiles(extension, ignoreFiles, ignoreDirs),
    { maxBuffer: 1024 * 500 }
  )

  if (stderr) console.error(`error: ${stderr}`)

  const res = stdout
    .split('\n')
    .filter((_) => {
      if (!!_) {
        if (!includesKeyword(keyword, _)) return
        if (!/[A-Z]/.test(_.split('/').pop())) return
      }
      return _
    })
    .join('\n')

  console.log(res)
}

module.exports = ({ E, W, C = false }) => ff(E, W)

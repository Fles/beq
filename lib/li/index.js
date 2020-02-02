#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const imports = (filePath) =>
  fs
    .readFileSync(path.resolve(filePath), 'utf-8')
    .match(
      /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm
    )

const ignoreFile = [
  'spec',
  'index',
  'types',
  'stories',
  'actions',
  'styled',
  'test',
  'chunk',
].reduce((_, file) => `${_} ! -name "*${file}*"`, '')

const ignoreDir = ['node_modules', 'mocks'].reduce(
  (_, dir) => `${_} ! -path "*${dir}*"`,
  ''
)

async function fi(extension) {
  const { stdout, stderr } = await exec(
    `find . -name "*.${extension}" ${ignoreFile} ${ignoreDir} -not -type d`
  )

  if (stderr) console.error(`error: ${stderr}`)

  const res = stdout
    .split('\n')
    .filter((_) => _)
    .filter((_) => {
      if (!!_) {
        if (!/[A-Z]/.test(_.split('/').pop())) return
      }
      console.log(imports(_))
      return _
    })
}

module.exports = ({ E, W, C = false }) => fi(E, W)

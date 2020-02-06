#!/usr/bin/env node
const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { ignoreDirs, ignoreFiles } = require('../ignores')
const { findAllFiles } = require('../../common/shell')

async function li(extension, includeInfo) {
  const { stdout, stderr } = await exec(
    findAllFiles(extension, ignoreFiles, ignoreDirs),
    { maxBuffer: 1024 * 500 }
  )

  if (stderr) console.error(`error: ${stderr}`)

  stdout
    .split('\n')
    .filter(_ => _)
    .forEach(file => {
      const stream = fs.createReadStream(file, { encoding: 'utf8' })
      stream.on('data', data => {
        const imports = data.match(
          /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*$/gm
        )
        const divider = Array(file.length)
          .fill('=')
          .join('')
        if (imports) {
          if (includeInfo) {
            console.log(divider)
            console.log(`${file}`)
            console.log(divider)
          }
          console.log(imports.join('\n'))
        }
      })
    })
}

module.exports = ({ E, F }) => li(E, F)

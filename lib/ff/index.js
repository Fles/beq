#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const includesKeyword = (keyword, filePath) =>
	fs
		.readFileSync(path.resolve(filePath), 'utf-8')
		.split('\n')
		.some((line) => line.includes(keyword))

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

async function ff(extension, keyword) {
	const { stdout, stderr } = await exec(
		`find . -name "*.${extension}" ${ignoreFile} ${ignoreDir} -not -type d`
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

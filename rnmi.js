#!/usr/bin/env node
const replaceInFiles = require("replace-in-files");

const options = {
  // See more: https://www.npmjs.com/package/globby
  // Single file or glob
  files: [`${__dirname}/*.tsx`],
  // See more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  // Replacement
  from: /import {([^}]*)} from '@old'/g, // string or regex
  to: _ => {
    const componentNames = _.toString()
      .match(/\{([^}]+)\}/)[0]
      .replace(/\s/g, "")
      .slice(1, -1)
      .split(",")
      .filter(str => /\S/.test(str));

    const newImports = componentNames.map(name => {
      return `import { ${name} } from '@new/.${name}'`;
    });

    return newImports.join("\n");
  },

  // See more: https://www.npmjs.com/package/glob
  optionsForFiles: {
    ignore: ["**/node_modules/**"]
  },

  // format: `${fileName}-${year}-${month}-${day}_${hour}:${minute}:${second}.{fileExtension}`
  //            fileName-2017-11-01_21:29:55.js
  // date of createFile old file or last modificate (if not find create date)
  saveOldFile: false, // default

  //Character encoding for reading/writing files
  encoding: "utf8", // default

  shouldSkipBinaryFiles: true, // default
  onlyFindPathsWithoutReplace: false, // default
  returnPaths: true, // default
  returnCountOfMatchesByPaths: true // default
};

replaceInFiles(options)
  .then(({ changedFiles, countOfMatchesByPaths }) => {
    //console.log(options.files)
    //console.log('Modified files:', changedFiles)
    //console.log('Count of matches by paths:', countOfMatchesByPaths)
    //console.log('was called with:', replaceInFilesOptions)
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });

const res = _ => _;

/* fs.readFile(path.join(__dirname, './content.tsx'), (err, data) => {
  if (err) throw 'Cant read file'
  const r = res(data.toString())
  console.log(r)
}) */

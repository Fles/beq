#!/usr/bin/env node

const { exec } = require("child_process");
//const from = /import {(.*)/g;
const from = "^import";
const list = path =>
  new Promise((resolve, fail) =>
    exec(`ls -la ${path}`, (err, stdout, stderr) => {
      if (err) fail(err);
      else resolve(stdout, stderr);
    })
  );

module.exports = path =>
  list(path)
    .then(stdout => {
      console.log(stdout);
    })
    .finally(_ => _);

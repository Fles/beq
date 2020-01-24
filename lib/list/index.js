#!/usr/bin/env node

const { exec } = require("child_process");
const glob = require("glob");

const files = path =>
  new Promise((resolve, fail) =>
    glob("**/*.js", { ignore: "**/node_modules/**" }, (err, files) => {
      if (err) fail(err);
      else resolve(files);
    })
  );

const list = a =>
  new Promise((resolve, fail) =>
    exec("ls", (err, stdout, stderr) => {
      if (err) fail(err);
      else resolve(stdout, stderr);
    })
  );

module.exports = path =>
  files(path)
    .then(stdout => {
      console.log(stdout);
    })
    .finally(_ => _);

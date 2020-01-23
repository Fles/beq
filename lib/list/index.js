#!/usr/bin/env node

module.exports = files => {
  let [arg1, arg2, arg3] = files.args;
  return null;
};

/* #!/usr/bin/env node
const { exec } = require("child_process");


const execList = (resolve, fail) =>
  exec("ls", (err, stdout, stderr) => {
    if (err) fail(err);
    else resolve(stdout, stderr);
  });

const list = a => new Promise(execList);

list().then(stdout => {
  console.log(stdout);
});
 */

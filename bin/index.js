#!/usr/bin/env node

const vCLI = require("commander");
const list = require("../lib/list/");

/*******************************************/
// list: list all imports
// $ modim list <path>
// $ modim ls <path>
vCLI
  .command("list <path>")
  .alias("ls")
  .action(list)
  .description("List all imports in path.");
/*******************************************/

vCLI.parse(process.argv);

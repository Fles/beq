#!/usr/bin/env node

const vCLI = require("commander");
const list = require("../lib/list/");

/*******************************************/
// list: list all imports
// $ modim list <required single file or glob>
// $ modim ls <required single file or glob>
vCLI
  .command("list <single file or glob>")
  .alias("ls")
  .action(list)
  .description("List all imports in path.");
/*******************************************/

vCLI.parse(process.argv);

#!/usr/bin/env node

const yargs = require("yargs");


const options = yargs
.usage("Usage: --zipversion <zip version>, --replicate <boolean>")
.option("zver", {alias: "zipversion", describe: "provide explicit zip version to be deployed", type: "number", demandOption:false})
.option("rep",{alias:"replicate",describe:"specify if you want aem replication to happen or not", type: "boolean", demandOption:true})
// .default({zipversion: null, replicate:false})
.argv;

console.log(`your options are: zipversion = ${options.zipversion} and replicate=${options.replicate}!`)
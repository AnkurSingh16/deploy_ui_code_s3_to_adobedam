const glob = require('glob');
const path = require('path');
const exec = require('child_process').exec;
const config = require('../config.json')

var files;

/**
 * 
 * @param {folder that you want to travers} src 
 * @param {callback function to execute post glob} callback 
 */
var getDirectiories = (src,callback) => {
    glob(src+ '/**/*',callback);
}

/**
 * 
 * @param {index to be used to stop recursion} count 
 */
async function executer(count) {
    let command = `curl -u admin:admin -X -F file=@${files[count]} ${config.aemDomain + config.aemPath}.createasset.html`;
    await exec(command,function(error,stdout,stderr) {
        if( error !== null) {
            console.log('exec error: ', error, files[count]);
            // emit error for jenkins
        }
        count++;
        if(count < files.length) {
            executer(count);
        }
        if( count === files.length) {
            // emit event for successfull deployment
            return true;
        }
    })
}

/**
 * 
 * @param {folder which to be deployed} folderName 
 */
var writeToDam = (folderName) => {
    getDirectiories(folerName,function (err, res) {
        if(err) {
            console.log('error',err);
            // emit event that glob failed to read
        } else {
            files = res.filter( function (file) {
                if(path.extname(file) !== '' && !/\.[0-9]/gi.test(path.extname(file))) {
                    return file;
                }
                executer(0)
            })
        }
    })
}

module.exports = writeToDam;

//extract the zip
// programatically check if folder exists if not create folder in dam and upload assets
// invalidate dispatcher cache
// replicate bsed on boolean flag provided.
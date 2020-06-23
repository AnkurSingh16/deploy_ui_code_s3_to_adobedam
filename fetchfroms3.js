//set AWS config
var AWS = require('aws-sdk');

const awsconfig = require("./awsconfig.json");
const extractzip = require('./utils/extractzip')

AWS.config.region = awsconfig.s3BucketRegion;

var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
AWS.config.region = awsconfig.s3BucketRegion;

var bucketParams = {
    Bucket: awsconfig.s3bucket
}

const s3 = new AWS.s3();
console.log(s3);

let bucketParams = {
    Bucket: awsconfig.s3bucket
    // key : "some key. find what key it is or what does key mean. probably name of the zip"
}



// const sts = new AWS.STS({region:awsconfig.s3BucketRegion});

const param = {
    RoleArn: awsconfig.roleARN,
    RoleSessionName: awsconfig.roleSessionName
};

  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function(err, data) {
    if (err) {
      console.log(`Error: listing objects from bucket => ${bucketParams.Bucket} with error => ${err}`);
    } else {
      console.log(`Success: All Objects in bucket => ${bucketParams.Bucket} are => ${data}`);
    }
  });

// let assumeRole = sts.assumeRole(param).promise();

// assumeRole.then((err,data) => {
//     if (err) { // an error occurred
//         console.log('Cannot assume role');
//         console.log(err, err.stack);
//         // stop pipeline
//       } else { // successful response
//         // AWS.config.update({
//         //   accessKeyId: data.Credentials.AccessKeyId,
//         //   secretAccessKey: data.Credentials.SecretAccessKey,
//         //   sessionToken: data.Credentials.SessionToken
//         // });

//         const accessParams = {
//               accessKeyId: data.Credentials.AccessKeyId,
//               secretAccessKey: data.Credentials.SecretAccessKey,
//               sessionToken: data.Credentials.SessionToken
//             };

//         // const s3 = new AWS.s3(accessParams);
//         console.log('assume role success',accessParams);
//       }
// });
// let fetchedObject = fetchObjectFromS3(s3,bucketParams);
// console.log('fetched object =>', fetchObjectFromS3);

// function fetchObjectFromS3 (s3, bucketParams) {
//     return new Promise((resolve,reject) => {
//         s3.getObject(bucketParams, (err,data) => {
//             if(err){
//                 console.log('cannot get object -> error =>',err);
//                 reject(err);
//             } else{
//                 console.log('object fetched',data);
//                 resolve(data);
//                 //call function to extract zip.
//             }
//         })
//     }).then((res) => {
//         console.log('fetching data from s3 promise then',res);
//         return res;
//     })
// }
  

//assume role
// fetch object from s3
//store it in memory
// call function to write that to dam.
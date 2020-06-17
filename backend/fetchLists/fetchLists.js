const DynamoDB = require('aws-sdk/clients/dynamodb');
const client = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

// const bcrypt = require("bcrypt");
// const util = require("util");
// const compare = util.promisify(bcrypt.compare);

const fetchLists = async ({ username }) => {
  const res = await client
    .query({
      TableName                 : process.env.USERNAME_TABLE,
      KeyConditionExpression    : '#Username = :InputUsername',
      ExpressionAttributeNames  : {
        '#Username' : 'Username',
      },
      ExpressionAttributeValues : {
        ':InputUsername' : username.toLowerCase(),
      },
    })
    .promise();
  console.log('TCL: login -> res', res);

  return {
    statusCode : 200,
    data       : res,
  };
};

module.exports = fetchLists;

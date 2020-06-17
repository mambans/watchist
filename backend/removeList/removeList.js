const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const removeList = async ({ username, listName }) => {
  const res = await client
    .update({
      TableName                : process.env.USERNAME_TABLE,
      Key                      : { Username: username.toLowerCase() },
      UpdateExpression         : 'remove #listName ',
      ExpressionAttributeNames : { '#listName': listName },
    })
    .promise();

  return res;

  // console.log(res);
  // return {
  //   statusCode: 200,
  //   body: "Account successfully created.",
  // };
};
module.exports = removeList;

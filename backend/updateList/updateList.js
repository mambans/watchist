const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const listUpdate = async ({ username, listItems, listName }) => {
  const res = await client
    .update({
      TableName                 : process.env.USERNAME_TABLE,
      Key                       : { Username: username.toLowerCase() },
      UpdateExpression          : `set #listName = :listValue`,
      ExpressionAttributeNames  : { '#listName': listName },
      ExpressionAttributeValues : {
        ':listValue' : listItems,
      },
      ReturnValues              : 'ALL_NEW',
    })
    .promise();

  return res;

  // console.log(res);
  // return {
  //   statusCode: 200,
  //   body: "Account successfully created.",
  // };
};
module.exports = listUpdate;

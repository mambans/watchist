const fetchLists = require("./fetchLists");

const handler = async event => {
  try {
    console.log("TCL: event", event);
    const { username } = event.queryStringParameters;
    if (!username) throw new Error("`Username` is required");

    const result = await fetchLists({ username });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
      // statusCode: res.statusCode,
      // isBase64Encoded: true,
    };
  } catch (error) {
    console.log("TCL: error", error);
    return {
      statusCode: 422,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      // body: JSON.stringify(res.data),
    };
  }
};

exports.handler = handler;

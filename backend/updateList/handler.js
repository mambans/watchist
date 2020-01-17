const updateList = require("./updateList");

const handler = async event => {
  try {
    console.log("TCL: event", event);
    // const { username, listItems, listName } = JSON.parse(event.body);
    const { username, listItems, listName } = JSON.parse(event.body);

    if (!username) throw new Error("`Username` is required");
    if (!listItems) throw new Error("`List Items` is required");
    if (!listName) throw new Error("`Lisi name` is required");

    const res = await updateList({
      username,
      listItems,
      listName,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
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

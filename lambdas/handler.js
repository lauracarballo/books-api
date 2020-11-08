const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.signup = async (event) => {
  const data = JSON.parse(event.body);
  if (data.email && data.password && data.name) {
    await dynamoDb
      .put({
        TableName: "bookshelf",
        Item: {
          userId: data.email,
          sortKey: "profile",
          name: data.name,
          password: data.password,
          email: data.email,
        },
      })
      .promise();
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports.login = async (event) => {
  const userInput = JSON.parse(event.body);
  if (userInput.email && userInput.password) {
    const data = await dynamoDb
      .get({
        TableName: "bookshelf",
        Key: { userId: userInput.email, sortKey: "profile" },
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: false, err: "user not found" }),
      };
    }

    const userPassword = data.Item.password;

    if (userPassword === userInput.password) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: false, err: "incorrect password" }),
      };
    }
  }
};

module.exports.save = async (event) => {
  const userInput = JSON.parse(event.body);
  if (userInput.books && userInput.wishlist) {
    await dynamoDb
      .put({
        TableName: "bookshelf",
        Item: {
          userId: userInput.userId,
          sortKey: "books",
          lists: userInput.lists,
        },
      })
      .promise();
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports.lists = async (event) => {
  const userId = event.queryStringParameters.userId;
  const data = await dynamoDb
    .get({
      TableName: "bookshelf",
      Key: { userId: userId, sortKey: "books" },
    })
    .promise();

  if (!data.Item) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, err: "user not found" }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data.Item.lists),
    };
  }
};

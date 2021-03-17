const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const jwt = require("jsonwebtoken");
const { default: ShortUniqueId } = require("short-unique-id");

const { JWT_SECRET } = process.env;

module.exports.signup = async (event) => {
  const userInput = JSON.parse(event.body);
  console.log(userInput);

  if (userInput.email && userInput.password && userInput.name) {
    const uid = new ShortUniqueId();

    await dynamoDb
      .batchWrite({
        RequestItems: {
          bookshelf: [
            {
              PutRequest: {
                Item: {
                  userId: userInput.email,
                  sortKey: "profile",
                  name: userInput.name,
                  password: userInput.password,
                  email: userInput.email,
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  userId: userInput.email,
                  sortKey: "books",
                  lists: {
                    wishlist: [],
                    books: [],
                  },
                  shareId: uid(),
                },
              },
            },
          ],
        },
      })
      .promise();

    const token = jwt.sign(
      {
        userId: userInput.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true, token }),
    };
  } else {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        error: "Enter a valid name/email/password",
      }),
    };
  }
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

    const token = jwt.sign(
      {
        userId: userInput.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    if (userPassword === userInput.password) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ success: true, token }),
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
  const authHeader = event.headers.Authorization;
  const token = authHeader.slice(7);
  const userInput = JSON.parse(event.body);

  const decoded = jwt.verify(token, JWT_SECRET);

  if (userInput.lists) {
    await dynamoDb
      .update({
        TableName: "bookshelf",
        Key: {
          userId: decoded.userId,
          sortKey: "books",
        },
        UpdateExpression: "set lists = :lists",
        ExpressionAttributeValues: {
          ":lists": userInput.lists,
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
  const authHeader = event.headers.Authorization;
  const token = authHeader.slice(7);
  console.log({ token });

  const decoded = jwt.verify(token, JWT_SECRET);

  const data = await dynamoDb
    .get({
      TableName: "bookshelf",
      Key: { userId: decoded.userId, sortKey: "books" },
    })
    .promise();

  if (!data.Item) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, err: "not authorized" }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        lists: data.Item.lists,
      }),
    };
  }
};

module.exports.profile = async (event) => {
  const authHeader = event.headers.Authorization;
  const token = authHeader.slice(7);
  console.log({ token });

  const decoded = jwt.verify(token, JWT_SECRET);

  const data = await dynamoDb
    .get({
      TableName: "bookshelf",
      Key: { userId: decoded.userId, sortKey: "profile" },
    })
    .promise();

  if (!data.Item) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, err: "not authorized" }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: true, name: data.Item.name }),
    };
  }
};

module.exports.sharedLists = async (event) => {
  const authHeader = event.headers.Authorization;
  const token = authHeader.slice(7);
  console.log({ token });

  const decoded = jwt.verify(token, JWT_SECRET);
  const data = await dynamoDb
    .get({
      TableName: "bookshelf",
      Key: { userId: decoded.userId, sortKey: "books" },
    })
    .promise();

  if (!data.Item) {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, err: "not authorized" }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        lists: data.Item.lists,
      }),
    };
  }
};

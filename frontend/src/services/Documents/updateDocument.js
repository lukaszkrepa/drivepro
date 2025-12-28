import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DeleteCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

// If title changed, perform delete (old PK) + put (new item). Otherwise update link.
export async function updateDocument(originalTitle, item) {
  if (!originalTitle) originalTitle = item.title;
  if (originalTitle !== item.title) {
    // delete old
    await ddbDocClient.send(new DeleteCommand({
      TableName: "documents",
      Key: { title: originalTitle },
    }));
    // put new
    await ddbDocClient.send(new PutCommand({
      TableName: "documents",
      Item: { title: item.title, link: item.link || "" },
    }));
    return;
  }

  // simple update of link
  const command = new UpdateCommand({
    TableName: "documents",
    Key: { title: item.title },
    UpdateExpression: "SET #link = :link",
    ExpressionAttributeNames: { "#link": "link" },
    ExpressionAttributeValues: { ":link": item.link || "" },
  });

  await ddbDocClient.send(command);
}


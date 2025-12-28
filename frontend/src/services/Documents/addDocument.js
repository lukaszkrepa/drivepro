import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addDocument(item) {
  const command = new PutCommand({
    TableName: "documents",
    Item: {
      title: item.title,
      link: item.link || "",
    },
  });

  await ddbDocClient.send(command);
}


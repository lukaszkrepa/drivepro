import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function fetchDocuments() {
  const command = new ScanCommand({
    TableName: "documents",
  });

  const response = await ddbDocClient.send(command);
  return response.Items || [];
}


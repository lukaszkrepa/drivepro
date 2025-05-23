import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addFaqItem(item) {
    const newItem = {
        ...item,
        list: item.list || [],
    };

    const command = new PutCommand({
        TableName: "FAQ",
        Item: newItem,
    });

    await ddbDocClient.send(command);
}

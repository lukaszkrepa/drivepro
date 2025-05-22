import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addGalleryItem(item) {
    const newItem = {
        ...item,
        categories: item.categories || [],
    };

    const command = new PutCommand({
        TableName: "Gallery",
        Item: newItem,
    });

    await ddbDocClient.send(command);
}

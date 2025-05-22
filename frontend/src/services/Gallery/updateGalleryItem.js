import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateGalleryItem(item) {
    const command = new UpdateCommand({
        TableName: "Gallery",
        Key: { Id: item.Id },
        UpdateExpression: `
            SET
                src = :src,
                title = :title,
                description = :description,
                categories = :categories
        `,
        ExpressionAttributeValues: {
            ":src": item.src || "",
            ":title": item.title || "",
            ":description": item.description || "",
            ":categories": item.categories || [],
        },
    });

    await ddbDocClient.send(command);
}

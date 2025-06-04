import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateCar(item) {
    const command = new UpdateCommand({
        TableName: "Cars",
        Key: { Id: item.Id },
        UpdateExpression: `
            SET #name = :name,
                details = :details,
                imageSrc = :imageSrc
        `,
        ExpressionAttributeValues: {
            ":name": item.name || "",
            ":details": item.details || [],
            ":imageSrc": item.imageSrc || "",
        },
        ExpressionAttributeNames: {
            "#name": "name",
        },
    });

    await ddbDocClient.send(command);
}

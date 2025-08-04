import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateStep(step) {
    const command = new UpdateCommand({
        TableName: "HomeSteps",
        Key: { Id: Number(step.Id) },
        UpdateExpression: `
            SET 
                title = :title,
                description = :description
        `,
        ExpressionAttributeValues: {
            ":title": step.title || "",
            ":description": step.description || "",
        },
    });

    await ddbDocClient.send(command);
}

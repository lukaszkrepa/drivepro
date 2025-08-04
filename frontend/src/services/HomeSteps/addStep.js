import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addStep(step) {
    const command = new PutCommand({
        TableName: "HomeSteps",
        Item: {
            ...step,
            Id: Number(step.Id),
            title: step.title || "",
            description: step.description || "",
        },
    });

    await ddbDocClient.send(command);
}

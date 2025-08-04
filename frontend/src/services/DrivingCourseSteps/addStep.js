import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addDrivingStep(step) {
    const command = new PutCommand({
        TableName: "DrivingCourseSteps",
        Item: {
            ...step,
            id: Number(step.id),
            stepNumber: Number(step.stepNumber),
            title: step.title || "",
            details: (step.details || []).map((d) => ({
                text: d.text || "",
                list: d.list || [],
                highlight: !!d.highlight,
            })),
        },
    });

    await ddbDocClient.send(command);
}

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateDrivingStep(step) {
    const command = new UpdateCommand({
        TableName: "DrivingCourseSteps",
        Key: { id: Number(step.id) },
        UpdateExpression: `
            SET 
                title = :title,
                stepNumber = :stepNumber,
                details = :details
        `,
        ExpressionAttributeValues: {
            ":title": step.title || "",
            ":stepNumber": Number(step.stepNumber),
            ":details": (step.details || []).map((d) => ({
                text: d.text || "",
                list: d.list || [],
                highlight: !!d.highlight,
            })),
        },
    });

    await ddbDocClient.send(command);
}

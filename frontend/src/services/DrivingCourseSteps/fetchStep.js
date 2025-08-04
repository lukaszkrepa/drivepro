import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function fetchDrivingSteps() {
    const command = new ScanCommand({
        TableName: "DrivingCourseSteps",
    });

    const result = await ddbDocClient.send(command);

    return (result.Items || []).sort((a, b) => a.stepNumber - b.stepNumber);
}

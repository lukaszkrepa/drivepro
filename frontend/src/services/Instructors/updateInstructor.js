// services/updateInstructor.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateInstructor(instructor) {
    const command = new PutCommand({
        TableName: "Instructors",
        Item: instructor,
    });

    await ddbDocClient.send(command);
}

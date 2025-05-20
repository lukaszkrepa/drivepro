// services/deleteCourse.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../config/awsConfig";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function deleteCourse(id) {
    const command = new DeleteCommand({
        TableName: "Courses",
        Key: { id: Number(id) },
    });

    await ddbDocClient.send(command);
}

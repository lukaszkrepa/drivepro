// services/addCourse.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../config/awsConfig";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addCourse(course) {
    const command = new PutCommand({
        TableName: "Courses",
        Item: {
            ...course,
            id: Number(course.id), // ensure numeric ID
            features: (course.features || []).map((f) => ({
                text: f.text || "",
                icon: f.icon || "",
                iconColor: f.iconColor || "blue",
            })),
        },
    });

    await ddbDocClient.send(command);
}

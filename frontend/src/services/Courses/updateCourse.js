// services/updateCourse.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    UpdateCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateCourse(course) {
    const command = new UpdateCommand({
        TableName: "Courses",
        Key: { id: Number(course.id) },
        UpdateExpression: `
      SET
        title = :title,
        price = :price,
        tag = :tag,
        tagColor = :tagColor,
        imageSrc = :imageSrc,
        imageAlt = :imageAlt,
        description = :description,
        buttonText = :buttonText,
        buttonColor = :buttonColor,
        icon = :icon,
        features = :features
    `,
        ExpressionAttributeValues: {
            ":title": course.title || "",
            ":price": course.price || "",
            ":tag": course.tag || "",
            ":tagColor": course.tagColor || "blue",
            ":imageSrc": course.imageSrc || "",
            ":imageAlt": course.imageAlt || "",
            ":description": course.description || "",
            ":buttonText": course.buttonText || "Zapisz się",
            ":buttonColor": course.buttonColor || "red",
            ":icon": course.icon || "",
            ":features": (course.features || []).map((f) => ({
                text: f.text || "",
                icon: f.icon || "",
                iconColor: f.iconColor || "blue",
            })),
        },
    });

    await ddbDocClient.send(command);
}

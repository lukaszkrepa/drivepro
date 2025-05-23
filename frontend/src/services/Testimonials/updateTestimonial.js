import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateTestimonial(item) {
    const isFeatured = item.type === "featured";

    const command = new UpdateCommand({
        TableName: "Testimonials",
        Key: { Id: item.Id },
        UpdateExpression: `
            SET #name = :name,
                #text = :text,
                rating = :rating,
                #type = :type
                ${isFeatured ? ", courseInfo = :courseInfo" : ""}
        `,
        ExpressionAttributeValues: {
            ":name": item.name || "",
            ":text": item.text || "",
            ":rating": Number(item.rating) || 0,
            ":type": item.type || "testimonial",
            ...(isFeatured && { ":courseInfo": item.courseInfo || "" }),
        },
        ExpressionAttributeNames: {
            "#name": "name",
            "#text": "text",
            "#type": "type",
        },
    });

    await ddbDocClient.send(command);
}

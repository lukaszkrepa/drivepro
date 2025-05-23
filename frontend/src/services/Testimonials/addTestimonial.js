import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addTestimonial(item) {
    const newItem = {
        ...item,
        rating: Number(item.rating), // ensure numeric
    };

    const command = new PutCommand({
        TableName: "Testimonials",
        Item: newItem,
    });

    await ddbDocClient.send(command);
}

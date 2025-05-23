import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function deleteTestimonial(id) {
    const command = new DeleteCommand({
        TableName: "Testimonials",
        Key: { Id: id },
    });

    await ddbDocClient.send(command);
}

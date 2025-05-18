import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    ScanCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../config/awsConfig";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function fetchTestimonials() {
    const command = new ScanCommand({
        TableName: "Testimonials",
    });

    const response = await ddbDocClient.send(command);
    console.log('Fetched data:', response.Items);

    return response.Items;
}

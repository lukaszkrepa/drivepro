import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    ScanCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../config/awsConfig";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function fetchCars() {
    const command = new ScanCommand({
        TableName: "Cars",
    });

    const response = await ddbDocClient.send(command);
    return response.Items;
}

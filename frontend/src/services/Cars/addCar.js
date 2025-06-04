import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function addCar(item) {
    const formatted = {
        ...item,
        details: item.details || [],
        imageSrc: item.imageSrc || ""
    };

    const command = new PutCommand({
        TableName: "Cars",
        Item: formatted,
    });

    await ddbDocClient.send(command);
}

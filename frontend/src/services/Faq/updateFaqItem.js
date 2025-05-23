import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../../config/awsConfig.js";

const client = new DynamoDBClient(awsConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function updateFaqItem(item) {
    const command = new UpdateCommand({
        TableName: "FAQ",
        Key: { Id: item.Id },
        UpdateExpression: `
            SET
                question = :question,
                answer = :answer,
                list = :list
        `,
        ExpressionAttributeValues: {
            ":question": item.question || "",
            ":answer": item.answer || "",
            ":list": item.list || [],
        },
    });

    await ddbDocClient.send(command);
}

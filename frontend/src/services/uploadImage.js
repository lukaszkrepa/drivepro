// services/uploadImage.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { awsConfig } from "../config/awsConfig";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client(awsConfig);
const BUCKET_NAME = "driveprophotos";

export async function uploadImage(file) {
    const fileName = `${uuidv4()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer(); // Convert to ArrayBuffer to avoid streaming error

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
    });

    await s3.send(command);

    return `https://${BUCKET_NAME}.s3.${awsConfig.region}.amazonaws.com/${fileName}`;
}
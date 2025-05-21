import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { awsConfig } from "../config/awsConfig";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client(awsConfig);
const BUCKET_NAME = "driveprophotos";

// ✅ Upload image to S3
export async function uploadImage(file) {
    const fileName = `uploads/${uuidv4()}-${file.name}`;
    const fileBuffer = await file.arrayBuffer(); // Required in browser environments

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
        ACL: "public-read", // Optional, based on your bucket policy
    });

    await s3.send(command);

    return `https://${BUCKET_NAME}.s3.${awsConfig.region}.amazonaws.com/${fileName}`;
}

// ✅ Delete image from S3
export async function deleteImage(imageUrl) {
    const key = extractKeyFromUrl(imageUrl);
    console.log("Extracted key for deletion:", key); // 🪵 LOG THIS

    if (!key) return;

    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    });

    try {
        await s3.send(command);
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Failed to delete image from S3:", error);
    }
}

// 🔧 Helper to extract object key from full image URL
function extractKeyFromUrl(url) {
    try {
        const parsed = new URL(url);
        const key = decodeURIComponent(parsed.pathname).replace(/^\/+/, ""); // removes leading slash
        return key;
    } catch (err) {
        console.error("Invalid image URL:", url);
        return null;
    }
}


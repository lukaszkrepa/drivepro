import { apiClient } from "./apiClient.js";

// Upload image to backend API
export async function uploadImage(file) {
    const base64 = await fileToBase64(file);

    const response = await apiClient.post('/files', {
        fileName: file.name,
        fileType: 'image',
        contentType: file.type,
        body: base64,
    });

    return response.data.url;
}

// Upload document to backend API
export async function uploadDocument(file) {
    const base64 = await fileToBase64(file);

    const response = await apiClient.post('/files', {
        fileName: file.name,
        fileType: 'document',
        contentType: file.type,
        body: base64,
    });

    return response.data.url;
}

// Delete image via backend API
export async function deleteImage(imageUrl) {
    if (!imageUrl) return;

    try {
        await apiClient.del('/files', { url: imageUrl });
        console.log("Image deleted successfully");
    } catch (error) {
        console.error("Failed to delete image:", error);
    }
}

// Delete document (alias of deleteImage)
export async function deleteDocument(documentUrl) {
    return deleteImage(documentUrl);
}

// Helper to convert a File to base64 string
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

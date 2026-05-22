import { apiClient } from "./apiClient.js";

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

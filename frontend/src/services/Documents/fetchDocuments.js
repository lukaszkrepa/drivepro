import { apiClient } from "../apiClient.js";

export async function fetchDocuments() {
    const response = await apiClient.get('/tables/documents');
    return response.data;
}

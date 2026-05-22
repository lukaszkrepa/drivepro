import { apiClient } from "../apiClient.js";

export async function deleteDocument(id) {
    const response = await apiClient.del('/tables/documents', { id });
    return response.data;
}

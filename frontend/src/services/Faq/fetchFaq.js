import { apiClient } from "../apiClient.js";

export async function fetchFaq() {
    const response = await apiClient.get('/tables/FAQ');
    return response.data;
}

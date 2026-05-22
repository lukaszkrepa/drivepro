import { apiClient } from "../apiClient.js";

export async function fetchGallery() {
    const response = await apiClient.get('/tables/Gallery');
    return response.data;
}

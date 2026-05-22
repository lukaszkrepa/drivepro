import { apiClient } from "../apiClient.js";

export async function updateGalleryItem(item) {
    const response = await apiClient.put('/tables/Gallery', item);
    return response.data;
}

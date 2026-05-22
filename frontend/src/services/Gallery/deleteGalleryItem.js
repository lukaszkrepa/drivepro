import { apiClient } from "../apiClient.js";

export async function deleteGalleryItem(id) {
    const response = await apiClient.del('/tables/Gallery', { id });
    return response.data;
}

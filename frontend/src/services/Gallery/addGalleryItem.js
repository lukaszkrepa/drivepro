import { apiClient } from "../apiClient.js";

export async function addGalleryItem(item) {
    const newItem = {
        ...item,
        categories: item.categories || [],
    };

    const response = await apiClient.post('/tables/Gallery', newItem);
    return response.data;
}

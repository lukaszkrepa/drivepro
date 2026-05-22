import { apiClient } from "../apiClient.js";

export async function addCar(item) {
    const formatted = {
        ...item,
        details: item.details || [],
        imageSrc: item.imageSrc || ""
    };

    const response = await apiClient.post('/tables/Cars', formatted);
    return response.data;
}

import { apiClient } from "../apiClient.js";

export async function updateCar(item) {
    const response = await apiClient.put('/tables/Cars', item);
    return response.data;
}

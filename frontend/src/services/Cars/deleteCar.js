import { apiClient } from "../apiClient.js";

export async function deleteCar(id) {
    const response = await apiClient.del('/tables/Cars', { id });
    return response.data;
}

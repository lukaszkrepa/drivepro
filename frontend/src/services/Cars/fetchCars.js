import { apiClient } from "../apiClient.js";

export async function fetchCars() {
    const response = await apiClient.get('/tables/Cars');
    return response.data;
}

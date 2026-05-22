import { apiClient } from "../apiClient.js";

export async function fetchHomeSteps() {
    const response = await apiClient.get('/tables/HomeSteps');
    return response.data;
}

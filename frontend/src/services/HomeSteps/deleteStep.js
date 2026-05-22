import { apiClient } from "../apiClient.js";

export async function deleteStep(Id) {
    const response = await apiClient.del('/tables/HomeSteps', { id: Number(Id) });
    return response.data;
}

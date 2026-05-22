import { apiClient } from "../apiClient.js";

export async function updateInstructor(item) {
    const response = await apiClient.put('/tables/Instructors', item);
    return response.data;
}

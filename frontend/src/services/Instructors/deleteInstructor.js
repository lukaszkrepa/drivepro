import { apiClient } from "../apiClient.js";

export async function deleteInstructor(id) {
    const response = await apiClient.del('/tables/Instructors', { id });
    return response.data;
}

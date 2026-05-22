import { apiClient } from "../apiClient.js";

export async function deleteCourse(id) {
    const response = await apiClient.del('/tables/Courses', { id });
    return response.data;
}

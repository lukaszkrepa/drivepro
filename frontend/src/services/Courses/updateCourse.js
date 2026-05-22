import { apiClient } from "../apiClient.js";

export async function updateCourse(course) {
    const response = await apiClient.put('/tables/Courses', course);
    return response.data;
}

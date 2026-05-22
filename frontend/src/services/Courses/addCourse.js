import { apiClient } from "../apiClient.js";

export async function addCourse(course) {
    const response = await apiClient.post('/tables/Courses', course);
    return response.data;
}

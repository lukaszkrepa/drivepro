import { apiClient } from "../apiClient.js";

export async function fetchCourses() {
    const response = await apiClient.get('/tables/Courses');
    return response.data;
}

import { apiClient } from "../apiClient.js";

export async function fetchInstructors() {
    const response = await apiClient.get('/tables/Instructors');
    return response.data;
}

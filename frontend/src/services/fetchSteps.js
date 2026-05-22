import { apiClient } from "./apiClient.js";

export async function fetchSteps() {
    const response = await apiClient.get('/tables/DrivingCourseSteps');
    return response.data;
}

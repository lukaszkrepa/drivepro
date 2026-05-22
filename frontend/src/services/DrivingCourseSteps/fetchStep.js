import { apiClient } from "../apiClient.js";

export async function fetchDrivingSteps() {
    const response = await apiClient.get('/tables/DrivingCourseSteps');
    return (response.data || []).sort((a, b) => a.stepNumber - b.stepNumber);
}

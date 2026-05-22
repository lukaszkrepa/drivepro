import { apiClient } from "../apiClient.js";

export async function deleteDrivingStep(id) {
    const response = await apiClient.del('/tables/DrivingCourseSteps', { id: Number(id) });
    return response.data;
}

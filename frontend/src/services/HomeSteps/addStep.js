import { apiClient } from "../apiClient.js";

export async function addStep(step) {
    const item = {
        ...step,
        Id: Number(step.Id),
        title: step.title || "",
        description: step.description || "",
    };

    const response = await apiClient.post('/tables/HomeSteps', item);
    return response.data;
}

import { apiClient } from "../apiClient.js";

export async function updateStep(step) {
    const item = {
        ...step,
        Id: Number(step.Id),
        title: step.title || "",
        description: step.description || "",
    };

    const response = await apiClient.put('/tables/HomeSteps', item);
    return response.data;
}

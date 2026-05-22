import { apiClient } from "../apiClient.js";

export async function updateDrivingStep(step) {
    const item = {
        ...step,
        id: Number(step.id),
        stepNumber: Number(step.stepNumber),
        title: step.title || "",
        details: (step.details || []).map((d) => ({
            text: d.text || "",
            list: d.list || [],
            highlight: !!d.highlight,
        })),
    };

    const response = await apiClient.put('/tables/DrivingCourseSteps', item);
    return response.data;
}

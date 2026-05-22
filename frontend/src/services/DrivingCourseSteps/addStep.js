import { apiClient } from "../apiClient.js";

export async function addDrivingStep(step) {
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

    const response = await apiClient.post('/tables/DrivingCourseSteps', item);
    return response.data;
}

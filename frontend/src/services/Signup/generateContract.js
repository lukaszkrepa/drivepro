const CONTRACT_API_URL = import.meta.env.VITE_CONTRACT_API_URL;

/**
 * Requests the backend to generate the contract DOCX and email it to the student.
 *
 * This call is non-blocking for the signup flow: callers should treat a thrown
 * error (or a `validation_status: "failed"` response) as a soft failure and keep
 * the signup itself successful. The backend emails the document directly, so the
 * frontend does not need to download or display the file.
 *
 * @param {Object} formData - The signup form data.
 * @returns {Promise<Object>} The parsed API response on success.
 * @throws {Error} If the endpoint is unreachable, returns a non-2xx status, or
 *                 responds with validation_status "failed".
 */
export async function generateContract(formData) {
    if (!CONTRACT_API_URL) {
        throw new Error('VITE_CONTRACT_API_URL is not configured.');
    }

    const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        pkk: formData.pkk || '',
        pesel: formData.pesel,
    };

    const response = await fetch(CONTRACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.validation_status === 'failed') {
        throw new Error(result.error || `Contract request failed with status ${response.status}`);
    }

    return result;
}

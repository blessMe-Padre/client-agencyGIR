

// Функция для обновления
export const updateUserDateService = async (recordId, data, url) => {
    try {
        const response = await fetch(`${url}/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
        
        return await response.json();
    } catch (error) {
        throw new Error(`Update failed: ${error.message}`);
    }
};
export async function deleteService({workerId, url}) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workerId),
    });
    
    const data = await response.json();
    return { response, data };
}

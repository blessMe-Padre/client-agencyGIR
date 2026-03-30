export default async function fetchData(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error; 
  }
}

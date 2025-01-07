// src/api/locationApi.ts
export const saveLocation = async (
  latitude: number,
  longitude: number,
  radius: number
): Promise<boolean> => {
  try {
    const response = await fetch("https://your-backend-api.com/save-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude, radius }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error saving location:", error);
    return false;
  }
};

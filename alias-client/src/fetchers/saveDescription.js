export const saveDescription = async (roomId, teamId, description, token) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/rooms/${roomId}/teams/${teamId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          description: description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit description");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error submitting description:", error);
    throw error;
  }
};

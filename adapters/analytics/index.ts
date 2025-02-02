import { ApiNoAuth } from "..";

// Function to track visits
const trackVisits = async () => {
  try {
    const response = await ApiNoAuth.post(`/analytics/track_visit`)
      
      //,{
    //   headers: {
    //     "Content-Type": "application/json",
    //     "User-Agent": navigator.userAgent || "Unknown",
    //     Referer: document.referrer || "Direct Visit",
    //   },
    // });
    return response.data;
  } catch (error) {
    console.error("Error logging visit:", error);
    throw new Error("Failed to log visit");
  }
};

export const analyticsService = { trackVisits };

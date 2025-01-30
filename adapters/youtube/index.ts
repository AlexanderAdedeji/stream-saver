import { toast } from "sonner";
import { ApiNoAuth } from "..";

/**
 * Fetches video metadata from YouTube
 * @param url - The YouTube video URL
 * @returns Video metadata or null if an error occurs
 */
const searchYoutubeVideo = async (url: string) => {
  try {
    const { data } = await ApiNoAuth.get(`/youtube/video/metadata?url=${encodeURIComponent(url)}`);
    console.log("Video Metadata:", data);
    return data;
  } catch (error: any) {
    console.error("Error fetching metadata:", error);
    toast.error("Failed to fetch video details. Try again.");
    return null;
  }
};

export interface YoutubeDownloadParams {
  url: string;
  quality: string;
}

/**
 * Downloads a YouTube video in the specified quality
 * @param params - { url: string, quality: string }
 * @returns The filename of the downloaded video
 */
const downloadYoutubeVideo = async (params: YoutubeDownloadParams) => {
  try {
    const response = await ApiNoAuth.post(
      `/youtube/video/download`,
      null,
      {
        params: { url: params.url, quality: params.quality },
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // Extract filename safely from response headers
    const contentDisposition = response.headers?.["content-disposition"];
    const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
    const filename = filenameMatch ? filenameMatch[1] : `video_${Date.now()}.mp4`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up memory to avoid leaks
    URL.revokeObjectURL(url);

    return { success: true, filename };
  } catch (error: any) {
    console.error("Error downloading video:", error);
    
    const errorMessage =
      error?.response?.data?.detail || "Video download failed";
    toast.error(errorMessage);

    // Show available formats if provided by the backend
    if (error?.response?.data?.availableFormats) {
      console.error("Available formats:", error.response.data.availableFormats);
      toast.error(`Available formats: ${error.response.data.availableFormats}`);
    }

    throw new Error(errorMessage);
  }
};

export const youtubeService = { searchYoutubeVideo, downloadYoutubeVideo };

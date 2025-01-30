

// src/adapters/instagram.ts
import { toast } from "sonner";
import { ApiNoAuth } from "..";
import { InstagramPostResponse } from "@/models";
 // Define proper types

const searchInstagramVideo = async (url: string): Promise<InstagramPostResponse> => {
  try {
    const { data } = await ApiNoAuth.get<InstagramPostResponse>("/instagram/metadata", {
      params: { url }
    });
    return data;
  } catch (error: any) {
    toast.error(error.response?.data?.detail || "Failed to fetch Instagram post");
    throw new Error(error.response?.data?.detail || "Instagram post fetch failed");
  }
};

const downloadMedia = async (url: string, mediaIndex: number = 0): Promise<void> => {
  try {
    const response = await ApiNoAuth.get("/instagram/download", {
      params: { url, media_index: mediaIndex },
      responseType: "blob",
    });

    const contentDisposition = response.headers["content-disposition"];
    let filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `instagram_media_${Date.now()}`;

    // Determine correct file extension based on Content-Type header
    const contentType = response.headers["content-type"];
    let fileExtension = "mp4"; // Default to mp4

    if (contentType.includes("image")) {
      fileExtension = "jpg"; // Handle images correctly
    }

    filename = filename.includes(".") ? filename : `${filename}.${fileExtension}`;

    // Create download link
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    toast.success("Download started successfully!");
  } catch (error: any) {
    console.error("Download Error:", error);
    toast.error(error.response?.data?.detail || "Failed to download media.");
  }
};
export const instagramService = {
  searchInstagramVideo,
  downloadMedia,
};


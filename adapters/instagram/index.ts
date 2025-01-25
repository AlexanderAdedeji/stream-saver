// import { toast } from "sonner";
// import { ApiNoAuth } from "..";




// const searchInstagramVideo = async (url: string) => {
//     try {
//         const { data } = await ApiNoAuth.get(`/instagram/metadata?url=${url}`)
//         console.log(data)
//         return data
//     }
//     catch (error) {
//         console.error(error);
//     }
// }



// const downloadMedia = async (url: string, filename: string) => {
//     try {
//       const response = await fetch(`/api/instagram/download?url=${encodeURIComponent(url)}`);
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);
      
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(downloadUrl);
//       document.body.removeChild(a);
//     } catch (error) {
//       toast.error("Failed to download media");
//     }
//   };

// export const instagramService = { searchInstagramVideo, downloadMedia }

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
      params: {
        url,
        media_index: mediaIndex
      },
      responseType: "blob"
    });

    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1]
      : `instagram_media_${Date.now()}.${mediaIndex === 0 ? "mp4" : "jpg"}`;

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error: any) {
    toast.error(error.response?.data?.detail || "Download failed");
    throw new Error(error.response?.data?.detail || "Media download failed");
  }
};

export const instagramService = {
  searchInstagramVideo,
  downloadMedia
};
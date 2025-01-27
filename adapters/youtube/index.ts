import { toast } from "sonner";
import { ApiNoAuth } from "..";




const searchYoutubeVideo = async (url: string) => {
    try {
        const { data } = await ApiNoAuth.get(`/youtube/video/metadata?url=${url}`)
        console.log(data)
        return data
    }
    catch (error) {
        console.error(error);
    }
}



export interface YoutubeDownloadParams {
    url: string;
    quality: string;
}

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
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
  
      // Extract filename
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `video_${Date.now()}.mp4`;
  
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      return { success: true, filename };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Video download failed";
      toast.error(errorMessage);
  
      // If backend provides available formats, handle that here
      if (error.response?.data?.availableFormats) {
        console.error("Available formats:", error.response.data.availableFormats);
        toast.error(`Available formats: ${error.response.data.availableFormats}`);
      }
  
      throw new Error(errorMessage);
    }
  };
  
export const youtubeService = { searchYoutubeVideo, downloadYoutubeVideo }
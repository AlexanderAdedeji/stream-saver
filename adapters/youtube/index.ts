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
            `youtube/video/download?url=${params.url}&quality=${params.quality}`,
    
            // {
            //     responseType: 'blob',
            // }
        );

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // Get filename from headers
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition
            ? contentDisposition.split('filename=')[1].replace(/"/g, '')
            : `video_${Date.now()}.mp4`;

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();

        return { success: true, filename };
    } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Download failed');
        throw new Error(error.response?.data?.detail || 'Video download failed');
    }
}

export const youtubeService = { searchYoutubeVideo, downloadYoutubeVideo }
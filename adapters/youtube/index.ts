import { ApiNoAuth } from "..";


interface youtubeDownloadParams {
    url: string;
    quality: string;

}

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



const downloadYotubeVideo = async (params: youtubeDownloadParams) => {
    try {
        const response = await ApiNoAuth.post(
            `/youtube/video/download?url=${params.url}&quality=${params.quality}`
            
        );
        
        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // Extract filename from headers
        const contentDisposition = response.headers['content-disposition'];
        const filenameMatch = contentDisposition.match(/filename=(.+)/);
        const filename = filenameMatch ? filenameMatch[1] : `video_${Date.now()}.mp4`;
        
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const youtubeService = { searchYoutubeVideo, downloadYotubeVideo }
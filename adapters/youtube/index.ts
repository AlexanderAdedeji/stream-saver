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




export const youtubeService = { searchYoutubeVideo }
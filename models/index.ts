export interface InstagramPostResponse {
    id: string;
    shortcode: string;
    type: "image" | "carousel" | "reel";
    caption: string;
    timestamp: string;
    like_count: number;
    view_count?: number;
    media: {
      index: number;
      url: string;
      type: "image" | "video";
      duration?: number;
      width: number;
      height: number;
    }[];
    username: string;
    user_avatar: string;
    music?: string;
    is_sponsored: boolean;
  }
'use client'

import React, { useState } from "react";
import {
  Search as SearchIcon,
  Download,
  Music,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Loader2,
  FileText,
  MousePointer,
  ScanLine,
} from "lucide-react";
import Search from "@/components/general/Search";
import PlatformHero from "@/components/general/PlatformHero";
import Image from "next/image";
interface TikTokVideo {
  title: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  stats: {
    likes: string;
    comments: string;
    bookmarks: string;
    shares: string;
  };
  music: {
    title: string;
    artist: string;
    duration: string;
  };
  caption: string;
  qualities: {
    quality: string;
    format: string;
    size: string;
  }[];
}
const TikTokPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<TikTokVideo | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [watermarkRemoval, setWatermarkRemoval] = useState(true);
  const [downloadMusic, setDownloadMusic] = useState(false);
  const handleGetInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setVideo({
        title: "Amazing Dance Challenge",
        thumbnail:
          "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
        author: {
          name: "Dance Stars",
          username: "@dancestars",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        },
        stats: {
          likes: "1.2M",
          comments: "24.5K",
          bookmarks: "156K",
          shares: "45K",
        },
        music: {
          title: "Original Sound",
          artist: "Dance Stars",
          duration: "0:30",
        },
        caption: "Try this new dance challenge 💃 #dance #viral #trending",
        qualities: [
          {
            quality: "HD",
            format: "mp4",
            size: "15 MB",
          },
          {
            quality: "SD",
            format: "mp4",
            size: "8 MB",
          },
        ],
      });
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">

        <PlatformHero icon={ <svg className="h-12 w-12 text-black mr-4" viewBox="0 0 24 24">
            
              <path
                fill="currentColor"
                d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
              />
            </svg>} title={" TikTok Downloader"} description={`Download TikTok videos without watermark, extract music, and save
            your favorite content in HD quality!`} className={"bg-gradient-to-b from-pink-50 to-white py-16"}/>
  
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <form
            onSubmit={handleGetInfo}
            className="bg-white rounded-xl shadow-sm p-6"
          >

            <Search searchItem={url} setSearchItem={setUrl } isSearching={false}  placeholder="Paste TikTok video URL here..."/>
            {/* <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Paste TikTok video URL here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={!url || loading}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Search size={20} />
                )}
                {loading ? "Getting Info..." : "Get Info"}
              </button>
            </div> */}
          </form>
        </div>
      </section>
      {video && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Video Preview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-[500px] object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={video.author.avatar}
                        alt={video.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{video.author.name}</h3>
                        <p className="text-sm text-gray-500">
                          {video.author.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{video.caption}</p>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{video.stats.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{video.stats.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark size={16} />
                        <span>{video.stats.bookmarks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={16} />
                        <span>{video.stats.shares}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-3">
                        <Music className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{video.music.title}</p>
                          <p className="text-sm text-gray-500">
                            {video.music.artist}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Download Options */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Remove Watermark</span>
                        <button
                          onClick={() => setWatermarkRemoval(!watermarkRemoval)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watermarkRemoval ? "bg-black" : "bg-gray-200"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watermarkRemoval ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Download Music</span>
                        <button
                          onClick={() => setDownloadMusic(!downloadMusic)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${downloadMusic ? "bg-black" : "bg-gray-200"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${downloadMusic ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {video.qualities.map((quality) => (
                          <label
                            key={quality.quality}
                            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedQuality === quality.quality ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="quality"
                                value={quality.quality}
                                checked={selectedQuality === quality.quality}
                                onChange={(e) =>
                                  setSelectedQuality(e.target.value)
                                }
                                className="sr-only"
                              />
                              <span className="font-medium">
                                {quality.quality}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                ({quality.format})
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {quality.size}
                            </span>
                          </label>
                        ))}
                      </div>
                      <button className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2">
                        <Download size={20} />
                        Download {downloadMusic ? "Music" : "Video"}
                        {watermarkRemoval &&
                          !downloadMusic &&
                          " (No Watermark)"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
export default TikTokPage
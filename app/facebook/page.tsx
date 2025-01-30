'use client'

import React, { useState } from "react";

import {
  Facebook,
  Search,
  Download,
  Film,
  Lock,
  Music,
  User,
  ThumbsUp,
  MessageCircle,
  Share2,
  Clock,
  Loader2,
  MousePointer,
  ScanLine,
} from "lucide-react";
import PlatformHero from "@/components/general/PlatformHero";
import Image from "next/image";
interface FacebookContent {
  type: "video" | "reel";
  title: string;
  thumbnail: string;
  duration?: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  author: {
    name: string;
    avatar: string;
  };
  qualities: {
    quality: string;
    format: string;
    size: string;
  }[];
  isPrivate: boolean;
}
const FacebookPage =() => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<FacebookContent | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [watermarkRemoval, setWatermarkRemoval] = useState({
    enabled: false,
    mode: "auto" as "auto" | "manual",
  });
  const handleGetInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      setContent({
        type: "video",
        title: "Amazing Travel Moments",
        thumbnail:
          "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800",
        duration: "3:45",
        views: "2.5M",
        likes: "125K",
        comments: "3.2K",
        shares: "15K",
        author: {
          name: "Travel Adventures",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        },
        qualities: [
          {
            quality: "HD",
            format: "mp4",
            size: "185 MB",
          },
          {
            quality: "SD",
            format: "mp4",
            size: "85 MB",
          },
        ],
        isPrivate: false,
      });
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
<PlatformHero className="bg-gradient-to-b from-blue-50 to-white py-16" icon={ <Facebook className="h-12 w-12 text-blue-600 mr-4" />} title={"Facebook Video Downloader"} description={`Download Facebook videos, reels, and stories in HD quality. Works
            with both public and private content!`}/>
      {/* <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
           
            <h1 className="text-4xl font-bold text-gray-900">
          
            </h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
     
          </p>
        </div>
      </section> */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <form
            onSubmit={handleGetInfo}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Paste Facebook video URL here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={!url || loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Search size={20} />
                )}
                {loading ? "Getting Info..." : "Get Info"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {content && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Content Preview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Image
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {content.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {content.duration}
                      </div>
                    )}
                    {content.isPrivate && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <Lock size={14} />
                        <span className="text-xs">Private</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={content.author.avatar}
                        alt={content.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{content.author.name}</h3>
                        <p className="text-sm text-gray-500">
                          {content.views} views
                        </p>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">
                      {content.title}
                    </h2>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={16} />
                        <span>{content.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{content.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={16} />
                        <span>{content.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Quality Selection */}
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Select Quality:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {content.qualities.map((quality) => (
                      <label
                        key={quality.quality}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedQuality === quality.quality ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="quality"
                            value={quality.quality}
                            checked={selectedQuality === quality.quality}
                            onChange={(e) => setSelectedQuality(e.target.value)}
                            className="sr-only"
                          />
                          <span className="font-medium">{quality.quality}</span>
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
                </div>
                {/* Watermark Removal */}
                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Remove Watermark
                    </h3>
                    <button
                      onClick={() =>
                        setWatermarkRemoval((prev) => ({
                          ...prev,
                          enabled: !prev.enabled,
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watermarkRemoval.enabled ? "bg-blue-600" : "bg-gray-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watermarkRemoval.enabled ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                  {watermarkRemoval.enabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() =>
                            setWatermarkRemoval((prev) => ({
                              ...prev,
                              mode: "auto",
                            }))
                          }
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${watermarkRemoval.mode === "auto" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 hover:border-blue-200"}`}
                        >
                          <ScanLine size={18} />
                          Auto Detect
                        </button>
                        <button
                          onClick={() =>
                            setWatermarkRemoval((prev) => ({
                              ...prev,
                              mode: "manual",
                            }))
                          }
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${watermarkRemoval.mode === "manual" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 hover:border-blue-200"}`}
                        >
                          <MousePointer size={18} />
                          Manual Select
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Download Button */}
                <div className="mt-6">
                  <button
                    disabled={!selectedQuality}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={20} />
                    Download Video
                    {watermarkRemoval.enabled && " (No Watermark)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


export default FacebookPage
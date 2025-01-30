"use client";

import { YoutubeDownloadParams, youtubeService } from "@/adapters/youtube";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import React, { useState } from "react";
import {
  Youtube, Download, Eye, Calendar, ThumbsUp, Loader2, Trash2
} from "lucide-react";

import Search from "@/components/general/Search";
import { Button } from "@/components/ui/button";
import PlatformHero from "@/components/general/PlatformHero";

interface VideoMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishDate: string;
  likes: string;
  qualities: { quality: string; format: string; size: string }[];
}

interface DownloadHistory {
  id: string;
  title: string;
  thumbnail: string;
  quality: string;
  format: string;
  downloadedAt: string;
}

const YoutubePage = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoMetadata | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([]);

  // Fetch video metadata
  const { mutate: fetchMetadata, isPending: fetching } = useMutation({
    mutationFn: () => youtubeService.searchYoutubeVideo(url),
    onSuccess: (data) => {
      setVideoInfo(data);
      toast.success("Video details loaded!");
    },
    onError: () => toast.error("Failed to fetch video details. Try again."),
  });

  // Function to get best available quality
  const getBestAvailableQuality = (requestedQuality: string) => {
    if (!videoInfo?.qualities.length) return null;
    
    const availableQualities = videoInfo.qualities.map(q => q.quality);
    return availableQualities.includes(requestedQuality)
      ? requestedQuality
      : availableQualities[0]; // Pick highest available quality
  };

  // Download video mutation
  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: ({ url, quality }: YoutubeDownloadParams) =>
      youtubeService.downloadYoutubeVideo({ url, quality }),
    onSuccess: (data, variables) => {
      toast.success(`Downloading: ${data.filename}`);

      setDownloadHistory((prev) => [
        {
          id: Date.now().toString(),
          title: videoInfo?.title || "",
          thumbnail: videoInfo?.thumbnail || "",
          quality: variables.quality,
          format: "MP4",
          downloadedAt: new Date().toLocaleString(),
        },
        ...prev,
      ]);
    },
    onError: () => toast.error("Error downloading video. Try again."),
  });

  // const handleDownload = () => {
  //   if (!videoInfo) {
  //     toast.error("Fetch video details first!");
  //     return;
  //   }

  //   const finalQuality = getBestAvailableQuality(selectedQuality);
  //   if (!finalQuality) {
  //     toast.error("No available quality to download.");
  //     return;
  //   }

  //   download({ url, quality: finalQuality });
  // };



  const handleDownload = async () => {
    if (!selectedQuality || !videoInfo) {
      toast.error("Please select a video quality!");
      return;
    }
  
    // Extract only the numeric value from the quality (e.g., "1080p" -> "1080")
    const numericQuality = selectedQuality.replace(/\D/g, ""); // Removes non-numeric characters
  
    if (!numericQuality) {
      toast.error("Invalid quality selected!");
      return;
    }
  
    try {
      // setIsDownloading(true);
  
      // Pass the extracted numeric value instead of "1080p"
      download({ url, quality: numericQuality });
  
      toast.success(`Downloading video in ${selectedQuality}`);
    } catch (error) {
      toast.error("Error downloading video. Please try again.");
    } finally {
      // setIsDownloading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <PlatformHero
        className="bg-red-50 py-16"
        icon={<Youtube className="h-12 w-12 text-red-600 mr-4" />}
        title="YouTube Video Downloader"
        description="Download any YouTube video in HD quality. Just paste the URL and get your video in seconds!"
      />

      {/* Search Input */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={(e) => { e.preventDefault(); fetchMetadata(); }} className="bg-white rounded-xl shadow-sm p-6">
            <Search searchItem={url} setSearchItem={setUrl} isSearching={fetching} placeholder="Paste YouTube URL here..." />
          </form>
        </div>
      </section>

      {/* Video Info Section */}
      {videoInfo && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Image src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full h-48 object-cover rounded-lg" width={600} height={400} />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {videoInfo.duration}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">{videoInfo.title}</h2>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Eye size={16} /> {videoInfo.views} views</div>
                    <div className="flex items-center gap-2"><Calendar size={16} /> Published on {videoInfo.publishDate}</div>
                    <div className="flex items-center gap-2"><ThumbsUp size={16} /> {videoInfo.likes} likes</div>
                  </div>
                </div>
              </div>

              {/* Quality Selection */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-4">Select Quality:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {videoInfo.qualities.map((quality) => (
                    <label key={quality.quality} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${selectedQuality === quality.quality ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-200"}`}>
                      <div className="flex items-center">
                        <input type="radio" name="quality" value={quality.quality} checked={selectedQuality === quality.quality} onChange={(e) => setSelectedQuality(e.target.value)} className="sr-only" />
                        <span className="font-medium">{quality.quality}</span>
                        <span className="ml-2 text-sm text-gray-500">({quality.format})</span>
                      </div>
                      <span className="text-sm text-gray-500">{quality.size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Download Button */}
              <div className="mt-6">
                <button onClick={handleDownload} disabled={isDownloading || !selectedQuality} className={`w-full px-6 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 ${isDownloading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}>
                  {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                  Download Video
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download History */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setDownloadHistory([])} className="text-gray-400 hover:text-gray-600">
              <Trash2 size={20} />
            </button>
          </div>
          {downloadHistory.length > 0 && (
            <div className="grid gap-4">
              {downloadHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 flex items-center gap-4">
                  <Image src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" width={64} height={64} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.quality} • {item.format} • {item.downloadedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default YoutubePage;

"use client";

import { YoutubeDownloadParams, youtubeService } from "@/adapters/youtube";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Search from "@/components/general/Search";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Youtube,
  Search as SearchIcon,
  Download,
  Clock,
  Eye,
  Calendar,
  ThumbsUp,
  Loader2,
  ChevronDown,
  Music,
  History,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eraser,
  MousePointer,
  ScanLine,
  Settings2,
} from "lucide-react";
import PlatformHero from "@/components/general/PlatformHero";
interface VideoMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishDate: string;
  likes: string;
  qualities: {
    quality: string;
    format: string;
    size: string;
  }[];
}
interface DownloadHistory {
  id: string;
  title: string;
  thumbnail: string;
  quality: string;
  format: string;
  downloadedAt: string;
}
interface WatermarkSettings {
  enabled: boolean;
  mode: "auto" | "manual";
  algorithm: "basic" | "advanced";
  position: "corner" | "center" | "custom";
}
const YoutubePage = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoMetadata | null>(null);
  const [selectedQuality, setSelectedQuality] = useState("");
  const [downloadFormat, setDownloadFormat] = useState<"video" | "audio">(
    "video"
  );
  const [showHistory, setShowHistory] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([
    {
      id: "1",
      title: "Sample Downloaded Video",
      thumbnail:
        "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=800&auto=format&fit=crop&q=60",
      quality: "1080p",
      format: "MP4",
      downloadedAt: "2 hours ago",
    },
  ]);
  const { mutate, isPending, data } = useMutation<any, any, any>({
    mutationFn: () => youtubeService.searchYoutubeVideo(url),
    onSuccess: (data) => setVideoInfo(data),
  });

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: (params: YoutubeDownloadParams) =>
      youtubeService.downloadYoutubeVideo(params),
    onSuccess: (data, variables) => {
      toast.success(`Download started: ${data.filename}`);
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
  });

  const handleDownload = () => {
    if (!selectedQuality || !videoInfo) return;

    download({
      url: url,
      quality: selectedQuality,
    });
  };

  const handleGetInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(url);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>(
    {
      enabled: false,
      mode: "auto",
      algorithm: "basic",
      position: "corner",
    }
  );

  // const handleDownload = () => {
  //   setShowSuccess(true);
  //   setTimeout(() => setShowSuccess(false), 3000);
  //   setDownloadHistory((prev) => [
  //     {
  //       id: Date.now().toString(),
  //       title: videoInfo?.title || "",
  //       thumbnail: videoInfo?.thumbnail || "",
  //       quality: selectedQuality,
  //       format: downloadFormat === "video" ? "MP4" : "MP3",
  //       downloadedAt: "Just now",
  //     },
  //     ...prev,
  //   ]);
  // };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <PlatformHero
        className="bg-red-50 py-16"
        icon={<Youtube className="h-12 w-12 text-red-600 mr-4" />}
        title={"  YouTube Video Downloader "}
        description={`Download any YouTube video in HD quality. Just paste the URL and get
          your video in seconds!`}
      />

      <section className="py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200"
              onClick={() => {
                setUrl("https://www.youtube.com/watch?v=example");
                setDownloadFormat("audio");
              }}
            >
              <Music className="inline-block w-4 h-4 mr-2" />
              Quick MP3
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
              HD Video (1080p)
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
              4K Video
            </button>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <form
            onSubmit={handleGetInfo}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <Search
              searchItem={url}
              setSearchItem={setUrl}
              isSearching={isPending}
              placeholder={"Paste YouTube URL here..."}
            />
          </form>
        </div>
      </section>
      {videoInfo && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Image
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {videoInfo.duration}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {videoInfo.title}
                    </h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{videoInfo.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Published on {videoInfo.publishDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp size={16} />
                        <span>{videoInfo.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Select Quality:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {videoInfo.qualities.map((quality) => (
                      <label
                        key={quality.quality}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedQuality === quality.quality
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-200"
                        }`}
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
                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Watermark Removal
                    </h3>
                    <button
                      onClick={() =>
                        setWatermarkSettings((prev) => ({
                          ...prev,
                          enabled: !prev.enabled,
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        watermarkSettings.enabled ? "bg-red-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          watermarkSettings.enabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  {watermarkSettings.enabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() =>
                            setWatermarkSettings((prev) => ({
                              ...prev,
                              mode: "auto",
                            }))
                          }
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                            watermarkSettings.mode === "auto"
                              ? "border-red-500 bg-red-50 text-red-600"
                              : "border-gray-200 hover:border-red-200"
                          }`}
                        >
                          <ScanLine size={18} />
                          Auto Detect
                        </button>
                        <button
                          onClick={() =>
                            setWatermarkSettings((prev) => ({
                              ...prev,
                              mode: "manual",
                            }))
                          }
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                            watermarkSettings.mode === "manual"
                              ? "border-red-500 bg-red-50 text-red-600"
                              : "border-gray-200 hover:border-red-200"
                          }`}
                        >
                          <MousePointer size={18} />
                          Manual Select
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Removal Algorithm
                          </span>
                          <select
                            value={watermarkSettings.algorithm}
                            onChange={(e) =>
                              setWatermarkSettings((prev) => ({
                                ...prev,
                                algorithm: e.target.value as
                                  | "basic"
                                  | "advanced",
                              }))
                            }
                            className="text-sm border rounded-md px-2 py-1"
                          >
                            <option value="basic">Basic (Faster)</option>
                            <option value="advanced">
                              Advanced (Better Quality)
                            </option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            Watermark Position
                          </span>
                          <select
                            value={watermarkSettings.position}
                            onChange={(e) =>
                              setWatermarkSettings((prev) => ({
                                ...prev,
                                position: e.target.value as
                                  | "corner"
                                  | "center"
                                  | "custom",
                              }))
                            }
                            className="text-sm border rounded-md px-2 py-1"
                          >
                            <option value="corner">Corner</option>
                            <option value="center">Center</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> Watermark removal quality may
                          vary depending on the video quality and watermark
                          type. Advanced algorithm provides better results but
                          takes longer to process.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading || !selectedQuality}
                    className={`w-full px-6 py-3 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 ${
                      isDownloading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}
                  >
                    {isDownloading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Download size={20} />
                    )}
                    Download Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle size={20} />
          <span>Download started successfully!</span>
        </div>
      )}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <History size={20} />
              Recent Downloads
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  showHistory ? "rotate-180" : ""
                }`}
              />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Trash2 size={20} />
            </button>
          </div>
          {showHistory && (
            <div className="grid gap-4">
              {downloadHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 flex items-center gap-4"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.quality} • {item.format} • {item.downloadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    // <div>
    //   <h2>Download Your Favorite YouTube Videos Effortlessly.</h2>

    //   <Search
    //     searchItem={""}
    //     setSearchItem={seturl}
    //     searchAction={searchYotubeLine}
    //     isSearching={isPending}
    //   />
    //   {data ? (
    //     <div>
    //       <Image
    //         src={data?.thumbnail}
    //         alt="youtube-video thumbnail"
    //         width={200}
    //         height={200}
    //       />

    //       <p>{data?.title}</p>

    //       <p className="">{data?.duration}</p>

    //       <Select
    //         onValueChange={(e) => {
    //           setQuality(e);
    //         }}
    //       >
    //         <SelectTrigger className="w-[180px]">
    //           <SelectValue placeholder="video quality" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           {data?.video_qualities.map((video: string) => (
    //             <SelectItem key={video} value={video}>
    //               {video}
    //             </SelectItem>
    //           ))}
    //         </SelectContent>
    //       </Select>

    //       <Button onClick={() => download()}>Download</Button>
    //     </div>
    //   ) : null}
    // </div>
  );
};

export default YoutubePage;

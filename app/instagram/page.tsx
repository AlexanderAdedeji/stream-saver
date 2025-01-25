"use client";

import { youtubeService } from "@/adapters/youtube";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

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
import { instagramService } from "@/adapters/instagram";
import { Link } from "react-router-dom";
import {
  Instagram,
  Search as SearchIcon,
  Download,
  Image as ImageIcon,
  Film,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eraser,
  MousePointer,
  ScanLine,
  Settings2,
} from "lucide-react";
import PlatformHero from "@/components/general/PlatformHero";

interface Media {
  url: string;
  type: string;
}
interface IGPost {
  type: "image" | "carousel" | "reel";
  media: Media[];
  thumbnail?: string;
  caption: string;
  like_count: string;
  username: string;
  user_avatar: string;
}
interface WatermarkRemoval {
  enabled: boolean;
  mode: "auto" | "manual";
  intensity: "low" | "medium" | "high";
}
const InstagramPage = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("");

  const { mutate, isPending, data } = useMutation<any, any, any>({
    mutationFn: () => instagramService.searchInstagramVideo(url),
    onSuccess: (data) => setPostInfo(data),
  });

  // const {
  //   mutate: download,
  //   isPending: downloadPending,
  //   data: video,
  // } = useMutation({
  //   mutationFn: () => youtubeService.downloadYotubeVideo({ url, quality }),
  //   onSuccess: (data) => toast.success("Download started!"),
  // });

  const handleGetInfo = (e) => {
    e.preventDefault();
    mutate(url);
  };
  const handleDownloadCurrentImage = () => {
    if (postInfo && postInfo.media && postInfo.media.length > 0) {
      const currentImage = postInfo.media[activeSlide];
      if (!currentImage) return;

      const link = document.createElement("a");
      link.href = currentImage.url;
      link.download = `image-${activeSlide + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAllImages = () => {
    if (postInfo && postInfo.media && postInfo.media.length > 0) {
      postInfo.media.forEach((mediaItem, index) => {
        const link = document.createElement("a");
        link.href = mediaItem.url;
        link.download = `image-${index + 1}.jpg`; // Default filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const [postInfo, setPostInfo] = useState<IGPost | null>(null);
  const [watermarkRemoval, setWatermarkRemoval] = useState<WatermarkRemoval>({
    enabled: false,
    mode: "auto",
    intensity: "medium",
  });
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="w-full bg-white border-b sticky top-0 z-50">
        {/* ... similar header as YouTube page ... */}
      </header>
 <PlatformHero icon={<Instagram className="h-12 w-12 text-pink-600 mr-4" />} title={"Instagram Downloader "} 
 description={`Download photos, carousels, and reels from Instagram. Save your
        favorite content in high quality!`} />
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
              placeholder={"Paste Instagram post/reel URL here..."}
            />
          </form>
        </div>
      </section>
      {postInfo && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                <Image
                  src={postInfo.user_avatar}
                  alt={postInfo.username}
                  className="w-10 h-10 rounded-full"
                  width={200}
                  height={200}
                />
                <div>
                  <h3 className="font-medium">{postInfo.username}</h3>
                  <p className="text-sm text-gray-500">
                    {postInfo.like_count} likes
                  </p>
                </div>
              </div>
              <div className="relative">
                {postInfo.type === "carousel" && (
                  <div className="relative aspect-square">
                    <Image
                      src={postInfo.media![activeSlide].url}
                      alt={`Slide ${activeSlide + 1}`}
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                    {postInfo.media!.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveSlide((prev) => Math.max(0, prev - 1))
                          }
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                          disabled={activeSlide === 0}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() =>
                            setActiveSlide((prev) =>
                              Math.min(postInfo.media!.length - 1, prev + 1)
                            )
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                          disabled={activeSlide === postInfo.media!.length - 1}
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {postInfo.media!.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === activeSlide
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                              onClick={() => setActiveSlide(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <span>{postInfo.caption}</span>
                  </div>
                )}
              </div>
              <div className="p-6 border-t">
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
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      watermarkRemoval.enabled ? "bg-pink-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        watermarkRemoval.enabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
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
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          watermarkRemoval.mode === "auto"
                            ? "border-pink-500 bg-pink-50 text-pink-600"
                            : "border-gray-200 hover:border-pink-200"
                        }`}
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
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                          watermarkRemoval.mode === "manual"
                            ? "border-pink-500 bg-pink-50 text-pink-600"
                            : "border-gray-200 hover:border-pink-200"
                        }`}
                      >
                        <MousePointer size={18} />
                        Manual Select
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Removal Intensity
                        </span>
                        <select
                          value={watermarkRemoval.intensity}
                          onChange={(e) =>
                            setWatermarkRemoval((prev) => ({
                              ...prev,
                              intensity: e.target.value as
                                | "low"
                                | "medium"
                                | "high",
                            }))
                          }
                          className="text-sm border rounded-md px-2 py-1"
                        >
                          <option value="low">Low (Faster)</option>
                          <option value="medium">Medium (Balanced)</option>
                          <option value="high">High (Best Quality)</option>
                        </select>
                      </div>
                    </div>
                    {watermarkRemoval.mode === "manual" && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Click and drag on the image to select the watermark
                          area
                        </p>
                      </div>
                    )}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Higher intensity provides better
                        watermark removal but may take longer to process.
                        Results may vary depending on the watermark complexity.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Download Options:
                </h3>
                {postInfo.type === "carousel" ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleDownloadAllImages}
                      className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download All Images{" "}
                      {watermarkRemoval.enabled && "(No Watermark)"}
                    </button>
                    <button
                      onClick={handleDownloadCurrentImage}
                      className="w-full px-6 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download Current Image{" "}
                      {watermarkRemoval.enabled && "(No Watermark)"}
                    </button>
                  </div>
                ) : (
                  <button className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2">
                    <Download size={20} />
                    Download {postInfo.type === "reel" ? "Video" : "Image"}{" "}
                    {watermarkRemoval.enabled && "(No Watermark)"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
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

export default InstagramPage;

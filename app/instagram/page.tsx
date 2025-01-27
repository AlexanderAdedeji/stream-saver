"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { instagramService } from "@/adapters/instagram";
import { toast } from "sonner";
import { Instagram, ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import PlatformHero from "@/components/general/PlatformHero";
import Search from "@/components/general/Search";

interface Media {
  url: string;
  type: string;
}
interface IGPost {
  type: "image" | "carousel" | "reel" | "video";
  media: Media[];
  thumbnail?: string;
  caption: string;
  like_count: string;
  username: string;
  user_avatar: string;
}

const InstagramPage = () => {
  const [url, setUrl] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [postInfo, setPostInfo] = useState<IGPost | null>(null);
  const [downloadingCurrent, setDownloadingCurrent] = useState(false); // Track current download
  const [downloadingAll, setDownloadingAll] = useState(false); // Track all downloads

  const { mutate, isPending } = useMutation<any, any, any>({
    mutationFn: () => instagramService.searchInstagramVideo(url),
    onSuccess: (data) => setPostInfo(data),
  });

  const handleGetInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(url);
  };

  const handleDownloadCurrent = async () => {
    if (!postInfo) return;

    setDownloadingCurrent(true); // Show loader for current
    try {
      await instagramService.downloadMedia(url, activeSlide);
      toast.success("Current media downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download the current media.");
    } finally {
      setDownloadingCurrent(false); // Hide loader
    }
  };

  const handleDownloadAll = async () => {
    if (!postInfo) return;

    setDownloadingAll(true); // Show loader for all
    try {
      for (const [index] of postInfo.media.entries()) {
        await instagramService.downloadMedia(url, index);
      }
      toast.success("All media downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download some media.");
    } finally {
      setDownloadingAll(false); // Hide loader
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <PlatformHero
        icon={<Instagram className="h-12 w-12 text-pink-600 mr-4" />}
        title={"Instagram Downloader"}
        description={`Download photos, carousels, and reels from Instagram. Save your favorite content in high quality!`}
        className="bg-gradient-to-b from-pink-50 to-white py-16"
      />

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
                {postInfo.type === "carousel" ? (
                  <div className="relative aspect-square">
                    {postInfo.media[activeSlide].type === "video" ? (
                      <video
                        src={postInfo.media[activeSlide].url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={`${postInfo.media[activeSlide].url}?auto=compress&h=1080&w=1080`}
                        alt={`Slide ${activeSlide + 1}`}
                        className="w-full h-full object-cover"
                        width={1080}
                        height={1080}
                      />
                    )}
                    {postInfo.media.length > 1 && (
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
                              Math.min(postInfo.media.length - 1, prev + 1)
                            )
                          }
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                          disabled={activeSlide === postInfo.media.length - 1}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                ) : postInfo.type === "video" ? (
                  <video
                    src={postInfo.media[0].url}
                    controls
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={`${postInfo.media[0].url}?auto=compress&h=1080&w=1080`}
                    alt="Instagram post"
                    className="w-full h-full object-cover"
                    width={1080}
                    height={1080}
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Download Options:
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadAll}
                    className={`w-full px-6 py-3 flex items-center justify-center gap-2 rounded-lg ${
                      downloadingAll
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                    disabled={downloadingAll}
                  >
                    {downloadingAll ? <Loader2 className="animate-spin" /> : <Download />}
                    Download All Media
                  </button>
                  <button
                    onClick={handleDownloadCurrent}
                    className={`w-full px-6 py-3 flex items-center justify-center gap-2 rounded-lg ${
                      downloadingCurrent
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                    disabled={downloadingCurrent}
                  >
                    {downloadingCurrent ? <Loader2 className="animate-spin" /> : <Download />}
                    Download Current Media
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default InstagramPage;

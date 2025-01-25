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

const Instagram = () => {
  const [url, seturl] = useState("");
  const [quality, setQuality] = useState("");

  const { mutate, isPending, data } = useMutation<any, any, any>({
    mutationFn: () => youtubeService.searchYoutubeVideo(url),
    onSuccess: (data) => console.log(data),
  });

  const {
    mutate: download,
    isPending: downloadPending,
    data: video,
  } = useMutation({
    mutationFn: () => youtubeService.downloadYotubeVideo({ url, quality }),
    onSuccess: (data) => toast.success("Download started!"),
  });

  const searchYotubeLine = () => {
    mutate(url);
  };

  return (
    <div>
      <h2>Download Your Favorite YouTube Videos Effortlessly.</h2>

      <Search
        searchItem={""}
        setSearchItem={seturl}
        searchAction={searchYotubeLine}
        isSearching={isPending}
      />
      {data ? (
        <div>
          <Image
            src={data?.thumbnail}
            alt="youtube-video thumbnail"
            width={200}
            height={200}
          />

          <p>{data?.title}</p>

          <p className="">{data?.duration}</p>

          <Select
            onValueChange={(e) => {
              setQuality(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="video quality" />
            </SelectTrigger>
            <SelectContent>
              {data?.video_qualities.map((video: string) => (
                <SelectItem key={video} value={video}>
                  {video}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => download()}>Download</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Instagram;

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

const Youtube = () => {
  const [url, seturl] = useState("");

  const { mutate, isPending, data } = useMutation<any, any, any>({
    mutationFn: () => youtubeService.searchYoutubeVideo(url),
    onSuccess: (data) => console.log(data),
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

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
};

export default Youtube;

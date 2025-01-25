

import image from "../../assets/growth.png";
import image3 from "../../assets/reflecting.png";
import image4 from "../../assets/looking-ahead.png";
import Image, { StaticImageData } from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Multi-Platform Support",
    description:
"Download videos from all major social platforms including YouTube, Instagram, TikTok, and Facebook. One tool for all your video downloading needs.",
    image: image4,
  },
  {
    title: "Advanced Watermark Removal",
    description:
    "Our AI-powered watermark removal technology ensures clean, professional-looking videos. Choose between automatic detection or precise manual control.",
    image: image3,
  },
  {
    title: "Premium Quality Downloads",
    description:
    "Get the highest quality downloads available, up to 4K resolution. Multiple format options including MP4 video and MP3 audio conversion.",
    image: image,
  },
];

const featureList: string[] = [
  "4K Quality",
  "Batch Downloads",
  "MP3 Conversion",
  "No Watermarks",
  "Multiple Formats",
  "Fast Downloads",
  "Cloud Storage",
  "Progress Tracking",
  "Browser Extension",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

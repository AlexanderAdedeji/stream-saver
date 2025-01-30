import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "StreamSaver is built so anyone—on mobile, desktop, or tablet—can quickly save videos or images. No complex steps, no special logins, just a seamless download process for all.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Our user community drives continuous improvements. Share ideas, discover trending downloads, and connect with others who love saving and repurposing memorable online content.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Whether you’re saving one video or managing a large batch, StreamSaver scales effortlessly. From TikTok shorts to 4K YouTube reels, we handle it all without slowing down.",
  },
  {
    icon: <GiftIcon />,
    title: "Gamification",
    description:
      "We reward creativity by encouraging users to repurpose their saved content. Future updates will introduce badges and achievements for active downloaders and contributors.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Discover how easy it is to download, manage, and share your favorite
        videos or images from any social platform using StreamSaver.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

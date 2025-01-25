
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../../assets/cube-leg.png";
import Image from "next/image";
import { Download, Shield, Zap } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "High-Speed Downloads",
    description:
      "Experience lightning-fast downloads with our optimized servers and advanced compression technology. Get your videos in seconds, not minutes.",
    icon: <Zap className="w-12 h-12 text-primary" />,
  },
  {
    title: "Secure & Private",
    description:
      "Your privacy is our priority. We use secure connections and don't store your downloaded content. Download with complete peace of mind.",
    icon: <Shield className="w-12 h-12 text-primary" />,
  },
  {
    title: "Smart Processing",
    description:
      "Our intelligent system automatically detects the best quality, removes watermarks, and optimizes video format for your device.",
    icon: <Download className="w-12 h-12 text-primary" />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Client-Centric{" "}
            </span>
            Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};

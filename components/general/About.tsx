import { Statistics } from "./Statistics";
import pilot from "../../assets/pilot.png";
import Image from "next/image";

export const About = () => {
  return (

    <section id="about" className="container py-24 sm:py-32">
    <div className="bg-muted/50 border rounded-lg py-12">
      <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
        <Image
          src={pilot}
          alt="Social Media Content"
          className="w-[300px] object-contain rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <div className="pb-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              About{" "}
              </span>
          Stream Saver
            </h2>
            <p className="text-xl text-muted-foreground mt-4">
              Stream Saver is your ultimate companion for saving content from
              all major social media platforms. Whether you're archiving
              memorable moments from Instagram, saving educational content
              from YouTube, or collecting trending videos from TikTok – we've
              got you covered with lightning-fast downloads and premium
              quality.
            </p>
            <p className="text-xl text-muted-foreground mt-4">
              Our advanced technology ensures you get the highest quality
              downloads possible, with features like watermark removal, format
              conversion, and batch processing. Plus, our secure and reliable
              service means you can download with complete peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">50M+</span>
              <span className="text-sm text-muted-foreground text-center">
                Videos Downloaded
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">4K</span>
              <span className="text-sm text-muted-foreground text-center">
                Max Quality
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">99.9%</span>
              <span className="text-sm text-muted-foreground text-center">
                Success Rate
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">24/7</span>
              <span className="text-sm text-muted-foreground text-center">
                Support Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    // <section id="about" className="container py-24 sm:py-32">
    //   <div className="bg-muted/50 border rounded-lg py-12">
    //     <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
    //       <Image
    //         src={pilot}
    //         alt=""
    //         className="w-[300px] object-contain rounded-lg"
    //       />
    //       <div className="bg-green-0 flex flex-col justify-between">
    //         <div className="pb-6">
    //           <h2 className="text-3xl md:text-4xl font-bold">
    //             <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
    //               About{" "}
    //             </span>
    //             Company
    //           </h2>
    //           <p className="text-xl text-muted-foreground mt-4">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    //             enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //             nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
    //             amet, consectetur adipiscing elit.
    //           </p>
    //         </div>

    //         <Statistics />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

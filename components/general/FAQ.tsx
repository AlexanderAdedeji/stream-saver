import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = 

[
    {
      question: "Is StreamSave free to use?",
      answer:
        "Yes, StreamSave offers a free tier that allows you to download videos in standard quality. For HD and 4K downloads, watermark removal, and advanced features, check out our premium plans.",
      value: "item-1",
    },
    {
      question: "Which social media platforms are supported?",
      answer:
        "StreamSave supports all major social media platforms including YouTube, Instagram, TikTok, Facebook, Twitter, and more. We regularly update our service to ensure compatibility with the latest platform changes.",
      value: "item-2",
    },
    {
      question: "What's the maximum video quality available for download?",
      answer:
        "We support downloads up to 4K quality (when available from the source). The available quality options depend on the original video quality and the platform it's hosted on. Premium users get access to the highest quality downloads.",
      value: "item-3",
    },
    {
      question: "Is it legal to download videos using StreamSave?",
      answer:
        "StreamSave is designed for downloading content for personal use only. Always ensure you have the right to download and use the content, and respect copyright laws and platform terms of service.",
      value: "item-4",
    },
    {
      question: "How does watermark removal work?",
      answer:
        "Our advanced watermark removal technology uses AI to detect and cleanly remove watermarks without affecting video quality. You can choose between automatic detection or manual selection for precise control.",
      value: "item-5",
    },
    {
      question: "Can I download multiple videos at once?",
      answer:
        "Yes, premium users can use our batch download feature to queue and download multiple videos simultaneously. Free users can download one video at a time.",
      value: "item-6",
    },
    {
      question: "Are the downloads safe and secure?",
      answer:
        "Absolutely. We use secure connections for all downloads and don't store any of your downloaded content on our servers. Your privacy and security are our top priorities.",
      value: "item-7",
    },
    {
      question: "What formats are available for download?",
      answer:
        "We support various formats including MP4, WebM for video, and MP3, AAC for audio. Premium users get access to additional format options and conversion features.",
      value: "item-8",
    },

];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <Link
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </Link>
      </h3>
    </section>
  );
};

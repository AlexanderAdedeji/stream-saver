"use client";

import { analyticsService } from "@/adapters/analytics";
import { About } from "@/components/general/About";
import { Cta } from "@/components/general/Cta";
import { FAQ } from "@/components/general/FAQ";
import { Features } from "@/components/general/Features";
import { Hero } from "@/components/general/Hero";
import { HowItWorks } from "@/components/general/HowItWorks";
import { Newsletter } from "@/components/general/Newsletter";
import { Pricing } from "@/components/general/Pricing";
import { Services } from "@/components/general/Services";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const { mutate } = useMutation({
    mutationFn: analyticsService.trackVisits,
  });
  useEffect(() => {
    mutate();
  }, []);
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      {/* <Pricing /> */}
      <Newsletter />
      <FAQ />
    </>
  );
}

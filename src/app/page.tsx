import Audio from "@/components/Audio";
import CTA from "@/components/CTA";
import { Features } from "@/components/Features";
import Hero from "@/components/Hero";
import Images from "@/components/Images";
import MoreFeatures from "@/components/MoreFeatures";
import TrendingTools from "@/components/TrendingTools";
import WhyWe from "@/components/WhyWe";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TrendingTools />
      <Images />
      <Audio />
      <MoreFeatures />
      {/* <CTA2 /> */}
      {/* <Connectivity /> */}
      <WhyWe />
      <CTA />
    </>
  );
}

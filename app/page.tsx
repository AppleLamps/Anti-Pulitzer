import { Closing } from "@/components/home/Closing";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Pillars } from "@/components/home/Pillars";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <HowItWorks />
      <Closing />
    </>
  );
}

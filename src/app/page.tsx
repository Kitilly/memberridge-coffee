import { Hero } from "@/components/home/Hero";
import { FeaturedCoffees } from "@/components/home/FeaturedCoffees";
import { OurStory } from "@/components/home/OurStory";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BrewingExperience } from "@/components/home/BrewingExperience";
import { BestSellers } from "@/components/home/BestSellers";
import { SubscriptionPromo } from "@/components/home/SubscriptionPromo";
import { FarmOrigins } from "@/components/home/FarmOrigins";
import { Reviews } from "@/components/home/Reviews";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCoffees />
      <OurStory />
      <WhyChoose />
      <BrewingExperience />
      <BestSellers />
      <SubscriptionPromo />
      <FarmOrigins />
      <Reviews />
      <InstagramGallery />
      <NewsletterBanner />
    </>
  );
}

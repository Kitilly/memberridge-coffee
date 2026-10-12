import { Hero } from "@/components/home/Hero";
import { FeaturedCoffees } from "@/components/home/FeaturedCoffees";
import { OurStory } from "@/components/home/OurStory";
import { WhyChoose } from "@/components/home/WhyChoose";
import { BrewingExperience } from "@/components/home/BrewingExperience";
import { BestSellers } from "@/components/home/BestSellers";
import { SubscriptionPromo } from "@/components/home/SubscriptionPromo";
import { FarmOrigins } from "@/components/home/FarmOrigins";
import { CoffeeBeltMap } from "@/components/home/CoffeeBeltMap";
import { Reviews } from "@/components/home/Reviews";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { Stats } from "@/components/home/Stats";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCoffees />
      <OurStory />
      <section aria-label="Memberridge by the numbers" className="py-20 border-b border-espresso/10">
        <Container>
          <Stats />
        </Container>
      </section>
      <WhyChoose />
      <BrewingExperience />
      <BestSellers />
      <SubscriptionPromo />
      <FarmOrigins map={<CoffeeBeltMap />} />
      <Reviews />
      <InstagramGallery />
      <NewsletterBanner />
    </>
  );
}

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden -mt-20">
      <Image
        src={images.heroHome}
        alt="Coffee cup beside scattered roasted beans on a wooden table, morning light"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-espresso/40" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="eyebrow text-cream/90 mb-6 animate-fade-up">
          Small-Batch Specialty Coffee
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-ivory leading-[1.05] max-w-4xl animate-fade-up [animation-delay:120ms]">
          Roasted with Purpose.
          <br />
          Shared with Passion.
        </h1>
        <p className="mt-6 max-w-md text-cream/85 text-[1.05rem] leading-relaxed animate-fade-up [animation-delay:220ms]">
          Ethically sourced beans, meticulously roasted in small batches —
          every bag begins with a farmer's story.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-up [animation-delay:320ms]">
          <LinkButton href="/coffee" variant="inverse">
            Shop the Collection
          </LinkButton>
          <LinkButton href="/about" variant="outline-inverse">
            Our Story
          </LinkButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/70 animate-fade-in [animation-delay:800ms]">
        <ChevronDown size={22} strokeWidth={1.2} />
      </div>
    </section>
  );
}

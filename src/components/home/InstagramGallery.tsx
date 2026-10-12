import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { SITE } from "@/lib/site";

const posts = [
  { src: images.gallery1, alt: "Roasted coffee beans scattered across a table", tall: true },
  { src: images.latteArt, alt: "Coffee brewing station with beans on a wooden board", tall: false },
  { src: images.gallery2, alt: "Milk poured into a latte, close up", tall: false },
  { src: images.baristaPour, alt: "Coffee being poured in low light", tall: true },
  { src: images.gallery3, alt: "Iced latte in a glass", tall: false },
  { src: images.marbleCup, alt: "Heart latte art seen from above", tall: false },
  { src: images.espressoSunlight, alt: "Espresso in a glass cup in afternoon sun", tall: true },
  { src: images.espressoPull, alt: "Latte with rosette art beside herbs", tall: false },
];

export function InstagramGallery() {
  const instagram = SITE.social.find((u) => u.includes("instagram")) ?? "https://instagram.com";

  return (
    <section className="py-28 bg-cream">
      <Container>
        <div className="flex flex-col items-center text-center mb-14">
          <InstagramIcon size={22} className="text-copper-ink mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl text-espresso">@memberridgecoffee</h2>
          <p className="mt-3 text-coffee">Mornings, roast days, and your cups. Tag us to be featured.</p>
        </div>

        <ul className="columns-2 sm:columns-3 lg:columns-4 gap-4 [&>li]:mb-4">
          {posts.map((post) => (
            <li key={post.src} className="break-inside-avoid reveal">
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className={`group relative block overflow-hidden ${post.tall ? "aspect-[3/4]" : "aspect-square"}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/35 transition-colors flex items-center justify-center">
                  <InstagramIcon size={22} className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="sr-only">(opens Instagram in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

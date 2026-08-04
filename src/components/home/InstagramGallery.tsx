import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { InstagramIcon } from "@/components/icons/SocialIcons";

const posts = [
  { src: images.gallery1, tall: true },
  { src: images.latteArt, tall: false },
  { src: images.gallery2, tall: false },
  { src: images.baristaPour, tall: true },
  { src: images.gallery3, tall: false },
  { src: images.marbleCup, tall: false },
  { src: images.gallery4, tall: true },
  { src: images.espressoPull, tall: false },
];

export function InstagramGallery() {
  return (
    <section className="py-28 bg-cream">
      <Container>
        <div className="flex flex-col items-center text-center mb-14">
          <InstagramIcon size={22} className="text-copper mb-4" />
          <h2 className="font-display text-4xl sm:text-5xl font-light text-espresso">
            @memberridgecoffee
          </h2>
          <p className="mt-3 text-coffee">Tag us for a chance to be featured.</p>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`relative overflow-hidden break-inside-avoid ${
                post.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={post.src}
                alt="Memberridge Coffee on Instagram"
                fill
                sizes="(min-width: 1024px) 23vw, 45vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

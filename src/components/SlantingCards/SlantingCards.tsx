// components/SlantingCards.tsx
import Image from "next/image";
import { cardsData } from "@/data/slantingCardData";

// ⬅ Changed: 3D transform removed, replaced with 2D skew and rotation
const commonTransformClasses =
  "transform origin-center skew-y-[20deg] rotate-[-30deg]";

const SlantingCards = () => {
  return (
    <section className="w-full flex items-center justify-center py-16 px-4S">
      {/* Wrapping container */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 justify-center items-center ">
        {cardsData.map((card) => (
          <div key={card.id} className="relative ">
            <div
              className={`
                slant-card relative
                bg-white shadow-lg p-1
                flex flex-col justify-between items-center text-center
                transition-all duration-500 ease-out
                ${card.cardWidth} ${card.cardHeight}
                ${commonTransformClasses}
                hover:scale-105 hover:skew-y-0 hover:rotate-0 hover:shadow-2xl
                -mx-0 z-0 hover:z-10
              `}
            >
              <Image
                src={card.imageSrc}
                alt={card.title}
                width={10000}
                height={10000}
                className="mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlantingCards;

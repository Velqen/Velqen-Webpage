// components/SlantingCards.tsx
import Image from "next/image";

interface CardData {
  id: number;
  imageSrc: string;
  title: string;

  cardWidth: string;
  cardHeight: string;
}

const cardsData: CardData[] = [
  {
    id: 1,
    imageSrc: "/home/features1.jpg",
    title: "Intuitive Interface",

    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
  {
    id: 2,
    imageSrc: "/home/features2.jpg",
    title: "Robust Performance",

    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
  {
    id: 3,
    imageSrc: "/home/features3.jpg",
    title: "Simplicity",

    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
];

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

      <style jsx>{`
        @media (max-width: 768px) {
          .slant-card {
            transform: none !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            width: 85% !important;
            max-width: 400px;
            height: auto !important;
            margin: 20px 0;
          }
          .slant-card:hover {
            transform: scale(1.02) !important;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
        }
      `}</style>
    </section>
  );
};

export default SlantingCards;

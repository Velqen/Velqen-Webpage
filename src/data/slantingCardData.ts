// data/slantingCardData.ts

export interface CardData {
  id: number;
  imageSrc: string;
  title: string;
  cardWidth: string;
  cardHeight: string;
}

export const cardsData: CardData[] = [
  {
    id: 1,
    imageSrc: "/home/features3.jpg",
    title: "Simplicity",
    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
  {
    id: 2,
    imageSrc: "/home/features1.jpg",
    title: "Intuitive Interface",
    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
  {
    id: 3,
    imageSrc: "/home/features2.jpg",
    title: "Robust Performance",
    cardWidth: "w-75 xl:w-95",
    cardHeight: "h-[210px] xl:h-[250px]",
  },
];

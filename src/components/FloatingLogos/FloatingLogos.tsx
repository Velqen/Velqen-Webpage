// components/FloatingLogos.tsx
import Image from "next/image";
import { slidingLogos } from "@/data/slidingLogos";

const FloatingLogos = () => {
  // Repeat logos enough to ensure seamless flow
  const repeatedLogos = [
    ...slidingLogos,
    ...slidingLogos,
    ...slidingLogos,
    ...slidingLogos,
  ];

  return (
    <div className="w-full overflow-hidden py-8 relative">
      <div className="flex animate-slide-track">
        {repeatedLogos.map((logo, idx) => (
          <div key={idx} className="flex-shrink-0 px-6">
            <Image
              src={logo}
              alt={`logo-${idx}`}
              width={1020}
              height={1060}
              className="object-contain h-28 w-auto"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-track {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          } /* Adjust this based on how many times you duplicated */
        }
        .animate-slide-track {
          animation: slide-track 25s linear infinite;
          min-width: fit-content;
        }
      `}</style>
    </div>
  );
};

export default FloatingLogos;

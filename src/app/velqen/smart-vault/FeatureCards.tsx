import { FileText } from "lucide-react";

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  { title: "PDF Invoices", description: "Auto-extract & classify" },
  { title: "Image Invoices", description: "Scan & categorize" },
  { title: "Bulk Upload", description: "Process multiple files" },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature) => {
        return (
          <div
            key={feature.title}
            className="group relative overflow-hidden bg-gray-900/80 p-6 rounded-2xl border border-gray-800 hover:border-velqen-orange/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-velqen-orange/0 group-hover:bg-velqen-orange/5 transition-all duration-300"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gray-800 group-hover:bg-velqen-orange/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <FileText className="text-velqen-light-gray group-hover:text-velqen-orange" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-1 text-white">{feature.title}</h3>
              <p className="text-sm text-velqen-light-gray">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import ChatBot from "@/components/ChatBot/ChatBot";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6 sm:p-10">
      <div className="w-[80%]">
        <InvoiceExtraction />
        <ChatBot />
      </div>
    </div>
  );
}

import ChatBot from "@/components/ChatBot/ChatBot";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center pt-16">
      <div className="flex flex-col justify-center items-center max-w-[1200px] w-[80%]">
        <h2 className="text-4xl py-10 bennett-gradient-text">
          Chat with Bennett
        </h2>
        <ChatBot />
      </div>
      <div className="w-[80%] flex flex-col justify-center items-center pt-32">
        <InvoiceExtraction />
      </div>
    </div>
  );
}

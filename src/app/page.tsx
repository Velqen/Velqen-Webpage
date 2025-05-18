import ChatBot from "@/components/ChatBot/ChatBot";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center pt-16">
      <div className="w-[80%] flex flex-col justify-center items-center">
        <InvoiceExtraction />
        <h2 className="text-4xl pt-32 pb-10">Chat with Bennett</h2>
        <ChatBot />
      </div>
    </div>
  );
}

import CardSwap, { Card } from "@/components/Animations/CardSwap";
import React from "react";

const VelqenFunctions = () => {
  const features = [
    {
      number: "01",
      title: "Automate Accounting Tasks",
      description:
        "Velqen reads your receipts, sorts your transactions, and creates invoices for you. Everything is handled in one simple chat with your assistant so you stay organised without the stress.",
      buttonText: "Get started",
    },
    {
      number: "02", // new feature now
      title: "Ask Velqen About Your Money",
      description:
        "Have questions about your expenses, weekly spending, or tax changes? Just ask Velqen and get instant insights. It's like having a finance expert available 24/7.",
      buttonText: "Ask now",
    },
    {
      number: "03", // previously 02
      title: "Effortless Reports & Summaries",
      description:
        "Turn all your transactions into clear, easy-to-read summaries. Instead of complex spreadsheets, you get simple overviews that show how much is coming in, how much is going out, and what’s left.",
      buttonText: "View reports",
    },
    {
      number: "04", // previously 03
      title: "The Simplicity Approach",
      description:
        "Behind every feature is one clear idea: simplicity. Velqen explains your money in plain words, gives you direct answers, and keeps things easy to follow. No jargon, no overload, just clarity so you can focus on what truly matters.",
      buttonText: "Experience simplicity",
    },
  ];

  return (
    <div className="w-full min-h-[180dvh] relative bg-velqen-black text-white flex pb-[250px]">
      {/* Feature List */}
      <div className="w-full mx-auto space-y-16 p-28 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border-b border-velqen-gray pb-12 last:border-b-0 h-[80dvh] flex flex-col justify-end"
          >
            <div className="mb-6">
              <span className="text-white text-xl font-light">
                {feature.number}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="text-white">{"//"}</span> {feature.title}
            </h2>

            <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {feature.description}
            </p>

            <button className="inline-flex items-center text-white hover:text-white transition-colors duration-200 group">
              <span className="text-lg font-medium">{feature.buttonText}</span>
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Parent container must have height and no overflow on y-axis */}
      <div className="relative w-full py-40">
        {/* Sticky element */}
        <div className="sticky top-[100px]">
          <div
            className="transform translate-x-[-200px] "
            style={{ height: "600px", position: "relative" }}
          >
            <CardSwap
              width={700}
              height={400}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <h3>Card 1</h3>
                <p>Your content here</p>
              </Card>
              <Card>
                <h3>Card 2</h3>
                <p>Your content here</p>
              </Card>
              <Card>
                <h3>Card 3</h3>
                <p>Your content here</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelqenFunctions;

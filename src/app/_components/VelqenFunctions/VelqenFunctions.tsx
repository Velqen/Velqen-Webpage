import CardSwap, { Card } from "@/components/Animations/CardSwap";
import React from "react";

const VelqenFunctions = () => {
  return (
    <div className="w-full h-[140dvh] relative bg- text-white">
      {/* Parent container must have height and no overflow on y-axis */}
      <div className="relative h-full">
        {/* Sticky element */}
        <div className="sticky top-[-10px] -translate-y-[-700px]">
          <div className="transform translate-x-[-200px]">
            <CardSwap
              width={1000}
              height={500}
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

import * as Progress from "@radix-ui/react-progress";
import { useEffect, useState } from "react";

const LoadingPage = () => {
  // State to track the progress value
  const [progressValue, setProgressValue] = useState(5);

  useEffect(() => {
    // Simulating progress update after a delay
    const timer = setTimeout(() => setProgressValue(88), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-blue-200 flex items-center justify-center h-screen">
      <Progress.Root
        className="relative overflow-hidden bg-black rounded-full w-[300px] h-[25px]"
        style={{
          transform: "translateZ(0)",
        }}
        value={progressValue}
      >
        <Progress.Indicator
          className="bg-blue-800 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export default LoadingPage;

import { useState, useEffect } from "react";

const ClockIndicator = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="pointer-events-none">
      <span className="text-white/60 font-['ITC_Avant_Garde_Gothic_Std'] text-[15px] font-light tracking-wide">
        {formatTime(time)} hs | Argentina
      </span>
    </div>
  );
};

export default ClockIndicator;
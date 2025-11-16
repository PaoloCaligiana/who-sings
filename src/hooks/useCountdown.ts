import { useEffect, useState } from "react";

export function useCountdown(seconds: number, onEnd: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      return;
    }
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, onEnd]);

  return timeLeft;
}

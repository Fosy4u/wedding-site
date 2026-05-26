"use client";

import { useEffect, useMemo, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyCountdown: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function useCountdown(targetDate: string) {
  const targetTime = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate],
  );
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const distance = targetTime - now;

      if (distance <= 0) {
        setCountdown(emptyCountdown);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return countdown;
}

import { useState, useEffect } from 'react';

export const useClock = (timeZone = 'Asia/Kolkata') => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone
      };
      setTime(`(${now.toLocaleTimeString('en-US', options)})`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
};

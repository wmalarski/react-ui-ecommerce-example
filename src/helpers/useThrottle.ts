import { useRef } from "react";

import { useEvent } from "./useEvent";

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const callbackRef = useEvent(callback);

  const isThrottling = useRef(false);
  const onScroll = (event: any) => {
    if (isThrottling.current) {
      return;
    }
    isThrottling.current = true;
    setTimeout(() => {
      callbackRef(event);
      isThrottling.current = false;
    }, delay);
  };

  return useEvent(onScroll as T);
};

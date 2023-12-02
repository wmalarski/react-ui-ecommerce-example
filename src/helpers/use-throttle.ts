import { useRef } from "react";
import { useEvent } from "./use-event";

export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T => {
  const callbackRef = useEvent(callback);

  const isThrottling = useRef(false);
  const lastArgs = useRef<any>();

  const onScroll = (...args: any[]) => {
    lastArgs.current = args;

    if (isThrottling.current) {
      return;
    }

    isThrottling.current = true;

    setTimeout(() => {
      isThrottling.current = false;
      callbackRef(...lastArgs.current);
    }, delay);
  };

  return useEvent(onScroll as T);
};

import { useRef, useEffect, useLayoutEffect } from "react";

function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useLayoutEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let timerId = setInterval(tick, delay);
    return () => clearInterval(timerId);
  }, [delay]);
}

export default useInterval;
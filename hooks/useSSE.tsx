import { useEffect, useState } from "react";

function useSSE<T>(
  url: string,
  listener: string,
  opt?: EventSourceInit,
  op?: boolean
) {
  const open = op == undefined ? true : op;

  const [data, setData] = useState<T>();
  useEffect(() => {
    if (open) {
      const es = new EventSource(url, opt);
      es.addEventListener(listener, (e) => {
        setData(JSON.parse(e.data));
      });
      return () => {
        es.close();
      };
    }
  }, [op]);
  return [data];
}

export default useSSE;

import React, { useEffect, useState } from "react";

function Solved({ children }: any) {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(!state);
  }, []);
  return <>{state && children}</>;
}

export default Solved;

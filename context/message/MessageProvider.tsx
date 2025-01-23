import React, { createContext } from "react";
import useM from "./useM";
import { ToastContainer } from "react-toastify";
const MessageContext = createContext({});
function MessageProvider({ children }: any) {
  const n = useM();
  return (
    <MessageContext.Provider value={n}>
      <ToastContainer
        toastStyle={{ color: "black" }}
        position="top-right"
        autoClose={1700}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      {children}
    </MessageContext.Provider>
  );
}
export { MessageContext, MessageProvider };

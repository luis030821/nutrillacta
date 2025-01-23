import { useContext } from "react";
import { MessageContext } from "./MessageProvider";

function useMessage() {
  return useContext(MessageContext) as message;
}

export default useMessage;
export interface message {
  message: (data: {
    type: "success" | "error" | "warning" | "alert";
    description: string | undefined;
  }) => void;
  messagePromise: (
    fn: Promise<any | void | undefined | null> | any,
    me: {
      pending?: (() => string) | string;
      success?: (() => string) | string;
      error?: (() => string) | string;
    }
  ) => void;
}

import {
  notifyAlert,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "./messages/TypeMessage";
import { toast } from "react-toastify";

export interface MessageProps {
  type: "success" | "error" | "warning" | "alert";
  description?: "";
}
function useM() {
  const message = (dataMessage: MessageProps | undefined) => {
    dataMessage?.type === "success" && notifySuccess(dataMessage);
    dataMessage?.type === "warning" && notifyWarning(dataMessage);
    dataMessage?.type === "error" && notifyError(dataMessage);
    dataMessage?.type === "alert" && notifyAlert(dataMessage);
  };
  const messagePromise = (
    fn: Promise<any | undefined | void | null>,
    me: {
      pending?: () => string | string;
      success?: () => string | string;
      error?: () => string | string;
    }
  ) => {
    toast.promise(fn, {
      error: typeof me.error == "string" ? me.error : me?.error?.(),
      pending: typeof me.pending == "string" ? me.pending : me?.pending?.(),
      success: typeof me.success == "string" ? me.success : me?.success?.(),
    });
  };
  return { message, messagePromise };
}
export default useM;

import { toast } from "react-toastify";
import { MessageProps } from "../useM";

const setupToast = (icon: any) => (dataMessage: MessageProps) => {
  //@ts-ignore
  toast[icon](dataMessage.description);
};

export const notifySuccess = setupToast("success");
export const notifyError = setupToast("error");
export const notifyWarning = setupToast("warn");
export const notifyAlert = setupToast("info");

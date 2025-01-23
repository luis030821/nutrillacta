import dayjs from "dayjs";
import { nanoid } from "nanoid";
import localizedFormat from "dayjs/plugin/localizedFormat";
import useMessage from "@/context/message/useMessage";
import client from "@/client";
function useInvoice() {
  const { messagePromise } = useMessage();
  dayjs.extend(localizedFormat);
  const createInvoice = async (
    data: {
      invoice: any[];
    } & any
  ) => {
    const dataInvoice = {
      invoiceId: nanoid(10),
      created: new Date(),
      formatedDate: dayjs().format("L"),
      organizationId: client.organizationId,
      ...data,
    };
    messagePromise(
      async () => {
        fetch(
          `${client.llampukaq}/v1/organization/${client.organizationId}/invoices`,
          { method: "POST", body: JSON.stringify(dataInvoice) }
        );
      },
      {
        error: "Error",
        pending: "Creando factura...",
        success: "Factura creada",
      }
    );
  };
  return { createInvoice };
}

export default useInvoice;

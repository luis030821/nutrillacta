import { withContext } from "@/context/withContext";
import { url } from "@/services/url";
import ConfirmarCompraPages from "@/infraestructure/confirmarCompra/ConfirmarCompraPages";

function Index() {
  return <ConfirmarCompraPages />;
}

export default withContext(Index);
export const getStaticProps = async () => {
  const products = await url("products");
  const cards = await url("cards");
  const categories = await url("categories");
  const value = {
    products,
    categories,
    cards,
  };
  return { props: value };
};

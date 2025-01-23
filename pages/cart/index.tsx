import { withContext } from "@/context/withContext";
import CartPage from "@/infraestructure/cart/CartPage";
import { url } from "@/services/url";

function Index() {
  return  <CartPage />;
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

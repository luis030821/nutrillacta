import { withContext } from "@/context/withContext";
import MePages from "@/infraestructure/me/MePages";
import { url } from "@/services/url";
import { RealmAccess } from "@llampukaq/realm";

function Index() {
  return (
    <RealmAccess>
      <MePages />
    </RealmAccess>
  );
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

import { withContext } from "@/context/withContext";
import HomePage from "@/infraestructure/home/HomePage";
import { url } from "@/services/url";
import withPWA from "@/services/withPWA";

function Home() {
  return <HomePage />;
}
export default withContext(Home);

export const getStaticProps = async () => {
  withPWA(
    "Nutrillacta",
    "https://nutrillacta.com/assets/favicon/android-icon-192x192.png"
  );
  const products = await url("products");

  const categories = await url("categories");
  const result = await (
    await fetch("https://nutrillacta.llampukaq.workers.dev/images")
  ).json();

  const value = {
    products,
    categories,
    images: result,
  };
  return { props: value };
};

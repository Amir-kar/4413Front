import { useEffect, useState } from "react"
import { ProductCard } from "../../../components/Element/ProductCard"
import { getFeturedList } from "../../../services";
import { toast } from "react-toastify";
export const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    async function fetchProducts() {
      try {
        const data = await getFeturedList();
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProducts();
  }, []);
  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </section>

  )
}
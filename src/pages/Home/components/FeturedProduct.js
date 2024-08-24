import { useEffect, useState } from "react"
import { ProductCard } from "../../../components/Element/ProductCard"
import { getList } from "../../../services";
import { toast } from "react-toastify";
export const FeaturedProduct = () => {
  const [food, setFood] = useState([]);
  const [leash,setLeash]=useState([]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    async function fetchProducts() {
      try {
        const data = await getList();
        const foodSplice=data.filter(data=>data.best_seller);
        const dogSplice=data.filter(data=>!data.best_seller);
        foodSplice.splice(3);
        dogSplice.splice(3);
        setFood(foodSplice);
        setLeash(dogSplice);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProducts();
  }, []);


  return (<>
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured Food</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {food.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
      
    </section>
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured Leashes</h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {leash.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
      
    </section>
    </>

  )
}
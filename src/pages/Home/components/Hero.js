import { Link } from "react-router-dom"

export const Hero = () => {
    return (
      <section className="flex flex-col lg:flex-row dark:text-slate-100 items-center">
          <div className="text my-5">
              <h1 className="text-4xl font-bold">Damazon: Porto Potties and Dog Leashes</h1>
              <p className="text-2xl my-7 px-1 dark:text-slate-300">Damazon is the most trusted and most popular place for Porto Potties. Find and access to the best toilets and the heighest quality of dog leashes around.</p>
              <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Explore Our Food</Link>
          </div>
          <div className="visual my-5 lg:max-w-xl">
              <img className="rounded-lg max-h-full" src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg" alt="Porto Patties, Leashes and More" />
          </div>
      </section>
    )
  }
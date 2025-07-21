import Image from "next/image";
import Categories from "./categories.jsx";
import Sorts from "./Sorts.jsx";

export default async function Home({ searchParams }) {
  const searchParam = await searchParams;
  const selectedCategory = searchParam.category || "mobile-accessories";
  const selectedSort = searchParam.sort || "all";
  let resPro = await fetch(
    `https://dummyjson.com/products/category/${selectedCategory}`
  );
  let proData = await resPro.json();
  let products = proData.products;

  let resCat = await fetch("https://dummyjson.com/products/categories");
  let categories = await resCat.json();

  const sortedProducts = [...products].sort((a, b) => {
    if (selectedSort == "price-asc") {
      return a.price - b.price;
    } else if (selectedSort == "price-desc") {
      return b.price - a.price;
    } else if (selectedSort == "customer-rewiew") {
      return b.rating - a.rating;
    } else if (selectedSort == "newest-arrivals") {
      return b.id - a.id;
    } else if (selectedSort == "best-sellers") {
      return b.stock - a.stock;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="flex justify-between p-[20px]">
        <div className="grid">
          <label className="font-[500] text-[15px]">Choose Category</label>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
        </div>
        <h1 className="font-[700] text-[30px] flex flex-col justify-center">
          Find Products
        </h1>

        <div className="grid">
          <label className="font-[500] text-[15px]">Sort By</label>
          <Sorts
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[20px] my-[20px] w-[1200px] mx-auto">
        {sortedProducts.map((item, idx) => {
          return (
            <div
              key={idx}
              className="shadow-sm duration-300 hover:shadow-2xl overflow-hidden"
            >
              <Image
                src={item.thumbnail}
                alt="img"
                // fill={true}
                width={170}
                height={170}
                sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                quality={100}
                priority={true}
                // placeholder="blur"
                // blurDataURL=""
                className="hover:scale-[1.1] duration-300 transform transition-transform cursor-pointer mx-auto"
              />
              <p className="text-center font-bold text-[14px] text-[#565959]">
                {item.title}
              </p>
              <p className="font-bold text-center pb-[10px]">Rs {item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

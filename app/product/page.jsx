"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const selectedCategory = searchParams.get("category") || "mobile-accessories";

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const data = await response.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(window.location.search);
    params.set("category", newCategory);
    router.push(`/product?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between p-[20px]">
        <div className="grid">
          <label className="font-[500] text-[15px]">Choose Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border-[1px] border-solid border-gray-400 rounded-[4px] p-[5px] text-[14px] font-bold text-[#565959]"
          >
            {categories.map((cat, idx) => (
              <option
                className="font-bold text-[14px] text-[#565959]"
                key={idx}
                value={cat.slug}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <h1 className="font-[700] text-[30px] flex flex-col justify-center">
          Find Products
        </h1>

        <div className="grid">
          <label className="font-[500] text-[15px]">Sort By</label>
          <select
            defaultChecked="all"
            className="bg-[#f0f2f2] rounded-[5px] border-[1px] border-solid border-gray-400 p-[5px] font-bold text-[14px] text-[#565959]"
          >
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="all"
            >
              All
            </option>
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="low-high"
            >
              Price: Low to High
            </option>
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="high-low"
            >
              Price: High to Low
            </option>
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="customer-rewiew"
            >
              Avg. Customer Review
            </option>
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="newest-arrivals"
            >
              Newest Arrivals
            </option>
            <option
              className="font-bold text-[14px] text-[#565959]"
              value="best-sellers"
            >
              Best Sellers
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[20px] my-[20px] w-[1200px] mx-auto">
        {products.map((item, idx) => {
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

export default Home;

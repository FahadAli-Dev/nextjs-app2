// import Image from "next/image";

// export default async function Home() {
//   let response = await fetch(
//     "https://dummyjson.com/products/category/mobile-accessories"
//   );
//   let data = await response.json();
//   let finalData = data.products;

//   let category = await fetch("https://dummyjson.com/products/categories");
//   let catgor = await category.json();
//   console.log(catgor);
//   return (
//     <div>
//       <div className="flex justify-between p-[20px]">
//         <div className="grid">
//           <label className="font-[500] text-[15px]">Choose Category</label>
//           <input
//             type="text"
//             placeholder="Product"
//             className="border-[1px] border-solid border-gray-400 rounded-[4px] p-[5px] text-[14px]"
//           />
//         </div>
//         <h1 className="font-[700] text-[30px] flex flex-col justify-center">
//           Find Products
//         </h1>

//         <div className="grid">
//           <label className="font-[500] text-[15px]">Sort By</label>
//           <select
//             defaultChecked="all"
//             className="bg-[#f0f2f2] rounded-[5px] border-[1px] border-solid border-gray-400 p-[5px] font-bold text-[14px] text-[#565959]"
//           >
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="all"
//             >
//               All
//             </option>
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="low-high"
//             >
//               Price: Low to High
//             </option>
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="high-low"
//             >
//               Price: High to Low
//             </option>
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="customer-rewiew"
//             >
//               Avg. Customer Review
//             </option>
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="newest-arrivals"
//             >
//               Newest Arrivals
//             </option>
//             <option
//               className="font-bold text-[14px] text-[#565959]"
//               value="best-sellers"
//             >
//               Best Sellers
//             </option>
//           </select>
//         </div>
//       </div>
//       <div className="grid grid-cols-4 gap-[20px] my-[20px] w-[1200px] mx-auto">
//         {finalData.map((item, idx) => {
//           return (
//             <div
//               key={idx}
//               className="shadow-sm duration-300 hover:shadow-2xl overflow-hidden"
//             >
//               <Image
//                 src={item.thumbnail}
//                 alt="img"
//                 // fill={true}
//                 width={170}
//                 height={170}
//                 sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
//                 quality={100}
//                 priority={false}
//                 // placeholder="blur"
//                 // blurDataURL=""
//                 className="hover:scale-[1.1] duration-300 transform transition-transform cursor-pointer mx-auto"
//               />
//               <p className="text-center font-bold text-[14px] text-[#565959]">
//                 {item.title}
//               </p>
//               <p className="font-bold text-center pb-[10px]">Rs {item.price}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "mobile-accessories";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // Fetch products whenever category changes
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, [selectedCategory]);

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
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="border-[1px] border-solid border-gray-400 rounded-[4px] p-[5px] text-[14px] font-bold text-[#565959]"
          >
            {categories.map((cat) => (
              <option
                className="font-bold text-[14px] text-[#565959]"
                key={cat.slug}
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
          <select className="bg-[#f0f2f2] rounded-[5px] border-[1px] border-solid border-gray-400 p-[5px] font-bold text-[14px] text-[#565959]">
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
        {products.map((item, idx) => (
          <div
            key={idx}
            className="shadow-sm duration-300 hover:shadow-2xl overflow-hidden"
          >
            <Image
              src={item.thumbnail}
              alt="img"
              width={170}
              height={170}
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              quality={100}
              priority={true}
              className="hover:scale-[1.1] duration-300 transform transition-transform cursor-pointer mx-auto"
            />
            <p className="text-center font-bold text-[14px] text-[#565959]">
              {item.title}
            </p>
            <p className="font-bold text-center pb-[10px]">Rs {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

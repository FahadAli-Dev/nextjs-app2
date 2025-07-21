"use client";

import { useRouter } from "next/navigation";

const Sorts = ({ selectedCategory, selectedSort }) => {
  const router = useRouter();

  return (
    <select
      onChange={(e) => {
        const params = new URLSearchParams(window.location.search);
        params.set("category", selectedCategory);
        params.set("sort", e.target.value);
        router.push(`/product2?${params.toString()}`);
      }}
      value={selectedSort}
      className="bg-[#f0f2f2] rounded-[5px] border-[1px] border-solid border-gray-400 p-[5px] font-bold text-[14px] text-[#565959]"
    >
      <option className="font-bold text-[14px] text-[#565959]" value="all">
        All
      </option>
      <option
        className="font-bold text-[14px] text-[#565959]"
        value="price-asc"
      >
        Price: Low to High
      </option>
      <option
        className="font-bold text-[14px] text-[#565959]"
        value="price-desc"
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
  );
};

export default Sorts;

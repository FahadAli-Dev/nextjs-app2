"use client";

import { useRouter } from "next/navigation";

const Categories = ({ categories, selectedCategory, selectedSort }) => {
  const router = useRouter();
  return (
    <select
      value={selectedCategory}
      onChange={(e) => {
        const params = new URLSearchParams(window.location.search);
        params.set("category", e.target.value);
        params.set("sort", selectedSort);
        router.push(`/product2?${params.toString()}`);
      }}
      className="font-bold text-[14px] text-[#565959] border-[1px] border-solid border-gray-400 rounded-[4px] p-[5px]"
    >
      {categories.map((item, idx) => {
        return (
          <option
            value={`${item.slug}`}
            className="font-bold text-[14px] text-[#565959]"
            key={idx}
          >
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default Categories;

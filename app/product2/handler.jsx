"use client";

import { useRouter } from "next/navigation";

const Handler = ({ categories, selectedCategory }) => {
  const router = useRouter();
  return (
    <select
      value={selectedCategory}
      onChange={(e) => {
        router.push(`/product2?category=${e.target.value}`);
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

export default Handler;

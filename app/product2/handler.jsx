"use client";

import { useRouter } from "next/navigation";

const Handler = ({ catgor }) => {
  const router = useRouter();
  return (
    <select
      onChange={(e) => {
        router.push(`/product2?category=${e.target.value}`);
      }}
      className="font-bold text-[14px] text-[#565959] border-[1px] border-solid border-gray-400 rounded-[4px] p-[5px]"
    >
      {catgor.map((item, idx) => {
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

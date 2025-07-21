import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul className="bg-black text-white font-semibold py-[20px] flex justify-center gap-[30px]">
        <Link href={"/"}>Home</Link>
        <Link href={"/product"}>Product</Link>
        <Link href={"/product2"}>Product2</Link>
      </ul>
    </div>
  );
};

export default Navbar;

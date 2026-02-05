import Link from "next/link";
import React from "react";

function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer"><Link href={"/"}>Home</Link></li>
        <li className="hover:text-blue-600 cursor-pointer"><Link href={"/cabins"}>Cabins</Link></li>
        <li className="hover:text-blue-600 cursor-pointer"><Link href={"/about"}>About</Link></li>
        <li className="hover:text-blue-600 cursor-pointer"><Link href={"/account"}>Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;

"use client";

import { CalculatorIcon, HomeIcon, User } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `group flex items-center gap-3 rounded-md px-3 py-2
     text-[15px] leading-6 transition-all duration-200
     ${
       pathname === href
         ? "bg-white/15 text-white font-medium"
         : "text-white/60 hover:bg-white/10 hover:text-white"
     }`;

  const iconClasses =
    "transition-transform duration-200 group-hover:scale-105";

  return (
      <ul className="flex flex-col md:flex-row flex-wrap gap-1 border">
        <li>
          <Link href="/account" className={linkClasses("/account")}>
            <HomeIcon size={18} className={iconClasses} />
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/account/reservations"
            className={linkClasses("/account/reservations")}
          >
            <CalculatorIcon size={18} className={iconClasses} />
            Reservations
          </Link>
        </li>

        <li>
          <Link
            href="/account/profile"
            className={linkClasses("/account/profile")}
          >
            <User size={18} className={iconClasses} />
            Guest profile
          </Link>
        </li>
      </ul>
  );
}

export default Sidebar;

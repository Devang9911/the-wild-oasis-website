"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navItems = [
  { label: "Home", href: "/account" },
  { label: "Reservations", href: "/account/reservations" },
  { label: "Guest Profile", href: "/account/profile" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col p-10 justify-between gap-5 h-full">
      <ul className=" flex md:flex-col flex-row gap-8 text-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
                relative inline-block pb-1 transition-all duration-300
                ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }
              `}
              >
                {item.label}

                {/* underline */}
                <span
                  className={`
                  absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <SignOutButton />
    </div>
  );
}

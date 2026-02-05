"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="hidden md:flex">
        <ul className="flex gap-10 text-lg font-medium text-gray-800">
          {[
            { name: "Home", href: "/" },
            { name: "Cabins", href: "/cabins" },
            { name: "About", href: "/about" },
            { name: "Account", href: "/account" },
          ].map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`relative pb-1 transition-all
          ${
            isActive(item.href)
              ? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black"
              : "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-gray-800"
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div
          className="absolute left-0 top-full w-full border-t bg-white md:hidden"
          ref={menuRef}
        >
          <ul className="flex flex-col gap-2 text-lg p-5">
            {[
              { name: "Home", href: "/" },
              { name: "Cabins", href: "/cabins" },
              { name: "About", href: "/about" },
              { name: "Account", href: "/account" },
            ].map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded transition-all
            ${
              active
                ? "bg-amber-100 text-black shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;

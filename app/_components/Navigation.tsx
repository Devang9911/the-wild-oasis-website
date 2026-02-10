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
        <ul className="flex gap-10 text-xl text-white/70 tracking-wider">
          {[
            { name: "Cabins", href: "/cabins" },
            { name: "About", href: "/about" },
            { name: "Guest area", href: "/account" },
          ].map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={`relative pb-1 transition-all
          ${
            isActive(item.href)
              ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white/70"
              : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white/70 after:transition-all hover:after:w-full"
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
        className="md:hidden text-white/70"
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full md:hidden">
          <div
            className="mx-4 mt-3 rounded-2xl border border-white/20 
                  bg-white/10 backdrop-blur-xl shadow-lg"
          >
            <ul className="flex flex-col gap-1 p-3 text-xl">
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
                      className={`block rounded-xl px-5 py-3 transition-all
                ${
                  active
                    ? "bg-black/50 text-white/70 backdrop-blur-md shadow-sm"
                    : "text-black hover:bg-white/40"
                }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;

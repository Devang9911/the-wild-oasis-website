"use client";

import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function NavMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

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
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-10 text-xl text-white/70 tracking-wider">
        <Link
          href={"/cabins"}
          className={`relative pb-1 transition-all
              ${
                isActive("/cabins")
                  ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white/70"
                  : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white/70 after:transition-all hover:after:w-full"
              }`}
        >
          Cabins
        </Link>
        <Link
          href={"/about"}
          className={`relative pb-1 transition-all
              ${
                isActive("/about")
                  ? "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white/70"
                  : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white/70 after:transition-all hover:after:w-full"
              }`}
        >
          About
        </Link>

        {session?.user?.image ? (
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
          >
            <Image
              src={session.user.image}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full border border-white/30"
            />
            <span>Guest area</span>
          </Link>
        ) : (
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        )}

        {/* 👇 Profile beside Guest Area */}
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white/70"
        aria-label="Toggle menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute left-0 top-full w-full md:hidden">
          <div
            ref={menuRef}
            className="mx-4 mt-3 rounded-2xl bg-gray-800 shadow-lg"
          >
            <ul className="flex flex-col gap-1 p-3 text-xl">
              {[
                { name: "Home", href: "/" },
                { name: "Cabins", href: "/cabins" },
                { name: "About", href: "/about" },
                { name: "Guest area", href: "/account" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-5 py-3 text-white/70 hover:bg-white/20"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* 👇 Mobile Profile */}
              {status === "authenticated" && session?.user && (
                <li className="px-5 py-3 border-t border-white/20 mt-2">
                  <div className="flex items-center gap-3">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={40}
                        referrerPolicy="no-referrer"
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <button
                      onClick={() => signOut()}
                      className="text-white/70 hover:underline text-xl"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default NavMenu;

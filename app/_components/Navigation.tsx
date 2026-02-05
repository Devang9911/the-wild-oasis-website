"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    function handleOutsideClick(e : MouseEvent){
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setOpen(false)
      }
    }
    document.addEventListener("mousedown",handleOutsideClick)
    return ()=> document.removeEventListener("mousedown",handleOutsideClick)
  },[])

  return (
    <>
      <nav className="hidden md:flex">
        <ul className="flex items-center gap-10 text-lg font-medium text-gray-800">
          <li>
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/cabins" className="hover:text-black transition">
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-black transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/account" className="hover:text-black transition">
              Account
            </Link>
          </li>
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
        <div className="absolute left-0 top-full w-full border-t bg-white md:hidden" ref={menuRef}>
          <ul className="flex flex-col gap-6 px-6 py-6 text-lg font-medium text-gray-800">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/cabins" onClick={() => setOpen(false)}>
                Cabins
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/account" onClick={() => setOpen(false)}>
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;

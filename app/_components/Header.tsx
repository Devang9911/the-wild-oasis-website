"use client";

import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="relative w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

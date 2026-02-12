"use client";

import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white/70 flex items-center py-5 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="flex w-full justify-between items-center px-10">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

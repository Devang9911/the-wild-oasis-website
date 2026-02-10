import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-6 text-white">
      <div className="max-w-xl text-center rounded-3xl p-10">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-3">Page not found</h2>

        <p className="text-white/70 mb-8">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="flex justify-center gap-4">
          <Link href={"/"}>
            <button className="bg-white/30 px-6 py-2.5 text-white/70 font-medium hover:bg-white/40 transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

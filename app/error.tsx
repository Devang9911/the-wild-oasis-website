"use client";

import Link from "next/link";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-6 text-white">
      <div className="max-w-xl text-center rounded-3xl p-10">
        <h1 className="text-6xl font-extrabold mb-4">Oops</h1>

        <h2 className="text-2xl font-semibold mb-3">
          Something went wrong
        </h2>

        <p className="text-white/70 mb-8 break-words">
          {error.message || "An unexpected error occurred."}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="bg-white/30 px-6 py-2.5 text-white/70 font-medium hover:bg-white/40 transition"
          >
            Try again
          </button>

          <Link href="/">
            <button className="bg-white/30 px-6 py-2.5 text-white/70 font-medium hover:bg-white/40 transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;

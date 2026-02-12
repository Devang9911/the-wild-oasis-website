import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="py-3 px-5 bg-red-800 rounded-2xl hover:bg-red-900 hover:text-white/70 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full cursor-pointer"
    >
      <ArrowRightIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;

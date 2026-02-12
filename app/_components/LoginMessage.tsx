import Link from "next/link";

function LoginMessage() {
  return (
    <div className="text-white/70 w-full bg-gray-700 flex items-center justify-center">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link href="/login" className="underline text-blue-600">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;

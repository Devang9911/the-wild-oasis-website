import Image from "next/image";
import bg from "@/public/bg.png";
import Link from "next/link";

export default function App() {
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        
        <Image
          src={bg}
          fill
          alt="Mountain with cabin"
          placeholder="blur"
          quality={75}
          priority
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="z-10 flex flex-col items-center">
          <h1 className="text-2xl md:text-5xl font-medium tracking-widest text-white/95 capitalize mb-5">
            Welcome to the paradise
          </h1>
          <Link href={"/cabins"}>
            <button className="bg-yellow-700 rounded shadow-2xl hover:bg-yellow-800 p-2 md:p-5 text-md md:text-xl text-white/95 cursor-pointer">
              Explore Luxary Cabins
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

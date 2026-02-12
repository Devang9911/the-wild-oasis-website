import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Database } from "../_lib/database.types";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

function CabinPoster({ cabin }: { cabin: Cabin }) {
  const { name, max_capacity, image, description, regular_price, discount } =
    cabin;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 bg-white/20 mb-10">
      {/* Image */}
      <div className="relative md:h-105 h-80">
        <Image
          src={image ?? ""}
          alt={`Cabin ${name}`}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-10 lg:p-14 flex flex-col justify-center">
        <h3 className="text-3xl lg:text-6xl font-black text-accent-100 mb-6">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 leading-relaxed mb-10">
          {description}
        </p>

        <ul className="space-y-5 text-primary-200">
          <li className="flex items-center gap-4">
            <UsersIcon className="h-6 w-6 text-accent-400" />
            <span className="text-lg">
              Up to <strong>{max_capacity}</strong> guests
            </span>
          </li>

          <li className="flex items-center gap-4">
            <MapPinIcon className="h-6 w-6 text-accent-400" />
            <span className="text-lg">
              In the heart of the <strong>Dolomites</strong>, Italy
            </span>
          </li>

          <li className="flex items-center gap-4">
            <EyeSlashIcon className="h-6 w-6 text-accent-400" />
            <span className="text-lg">
              <strong>100%</strong> privacy guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CabinPoster;

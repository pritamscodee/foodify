import { useState } from "react";
import { Link } from "react-router";
import { Slider } from "@/components/ui/slider";

type user_input_props = {
  setdata: (value: string) => void;
};

export default function Navbar({ setdata }: user_input_props) {
  const [value, setvalue] = useState<string>("");

  function handleinput() {
    setdata(value.toLowerCase().trim());
  }

  return (
    <>
      <header className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center">
          <span className="p-4">
            <img className="h-11 w-13" src="/foodie.png" alt="" />
          </span>
          <nav className="py-5 font-extrabold text-pink-500 text-2xl">
            Foodify
          </nav>
        </div>

        {/* Menu */}
        <div className="p-3">
          <ul className="flex items-center gap-6">
            <Link to="/cartitems">
              <li className="text-pink-500">all carts</li>
            </Link>

            <Link to="/foods">
              <li className="text-pink-500">All-foods</li>
            </Link>

            <li className="text-blue-600 dark:text-sky-400">Call us</li>
            <li className="text-blue-600 dark:text-sky-400">Wishlists</li>
          </ul>
        </div>

        {/* Search + Slider */}
        <div className="flex items-center gap-4 p-4">
          {/* Slider */}
          <div className="w-40">
            <span className="text-sm font-semibold  text-amber-700 text-9xl">
              Price
            </span>
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>

          {/* Search */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
              onChange={(e) => setvalue(e.target.value)}
            />

            <Link to="/foods">
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded-r-lg hover:bg-blue-600"
                onClick={handleinput}
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

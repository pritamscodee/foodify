import { useState } from "react";
import { Link } from "react-router";

export default function Navbar({ setdata }: any) {
  const [value, setvalue] = useState("");

  function handleinput() {
    setdata(value.toLowerCase().trim());
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-dashed border-black bg-gray-300 px-6 py-4 shadow-[4px_4px_0px_black]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/foodie.png"
            className="h-10 w-10 border-2 border-black rounded-md rotate-[-3deg]"
          />
          <h1 className="text-2xl font-bold tracking-wider">Foodify</h1>
        </div>

        {/* Menu */}
        <ul className="flex gap-8 font-semibold">
          <Link to="/foods">
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
              Foods
            </li>
          </Link>

          <Link to="/cartitems">
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
              Cart
            </li>
          </Link>

          <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
            Wishlist
          </li>

          <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
            Call Us
          </li>
        </ul>

        {/* Search */}
        <div className="flex border-2 border-black rounded-md overflow-hidden shadow-[3px_3px_0px_black]">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 outline-none"
            onChange={(e) => setvalue(e.target.value)}
          />

          <Link to="/foods">
            <button
              onClick={handleinput}
              className="bg-yellow-300 px-4 font-bold border-l-2 border-black hover:bg-yellow-400"
            >
              Go
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

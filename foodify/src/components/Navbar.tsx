import { useState } from "react";
import { Link } from "react-router";

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
      <header className="flex   justify-between items-center  ">
        <div className="flex">
          <span className="p-4">
            <img className="h-11 w-13" src="/foodie.png" alt="" />
          </span>
          <nav className="py-5  font-extrabold text-pink-500 text-2xl">
            Foodify
          </nav>
        </div>

        <div className="p-3 w-fit">
          <ul className="flex m-2 w-full justify-between gap-6">
            <li className="text-blue-600/100 dark:text-sky-400/100">
              {" "}
              Cart-items{" "}
            </li>
            <Link to="/foods">
              {" "}
              <li className=" text-pink-500   ">All-foods</li>{" "}
            </Link>
            <li className="text-blue-600/100 dark:text-sky-400/100">
              {" "}
              Call us
            </li>
            <li className="text-blue-600/100 dark:text-sky-400/100">
              {" "}
              Wishlists
            </li>
          </ul>
        </div>

        <div className="p-4 w-90 flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500    hover:border-blue-300 text-amber-300"
            onChange={(e) => setvalue(e.target.value)}
          />
          <Link to="/foods">
            {" "}
            <button
              className="  px-4 py-2 border rounded-4xl  text-white bg-blue-700 rounded-r-lg hover:bg-blue-600 "
              onClick={handleinput}
            >
              Search
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}

import React, { useState } from "react";
import { Link, Links } from "react-router";

type user_input_props = {
  setdata: React.Dispatch<React.SetStateAction<string>>;
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
          <nav className="py-5  font-extrabold text-2xl">Foodify</nav>
        </div>

        <div className="p-4 w-64 ">
          <ul className="flex  m-2 w-full justify-between">
            <Link to="/foods">
              {" "}
              <li>All-foods</li>{" "}
            </Link>
            <li> Call us</li>
          </ul>
        </div>

        <div className="p-4 w-90 flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            onChange={(e) => setvalue(e.target.value)}
          />
          <Link to="/foods">
            {" "}
            <button
              className="  px-4 py-2 border rounded-4xl  text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 "
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

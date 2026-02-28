import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

type Cartmeals = {
  name: string;
  img: string;
  category: string;
  area: string;
  price: number;
  rating: number;
};

function Layout() {
  const [data, setdata] = useState<string>("");
  const [cart, setcart] = useState<Cartmeals[]>([]);
  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar setdata={setdata} />

      <Outlet context={{ data, setdata, cart, setcart }} />
    </div>
  );
}

export default Layout;

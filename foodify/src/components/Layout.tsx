import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

function Layout() {
  const [data, setdata] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar setdata={setdata} />

      <Outlet context={{ data, setdata }} />
    </div>
  );
}

export default Layout;

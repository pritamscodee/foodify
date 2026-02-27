import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

function Layout() {
  const [data, setdata] = useState<string>("");

  return (
    <>
      <Navbar setdata={setdata} />

      <Outlet context={{ data, setdata }} />
    </>
  );
}

export default Layout;

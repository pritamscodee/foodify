import React from "react";
import { useOutletContext } from "react-router";
import Foods from "./foods";

// Define the shape of the context we get from Layout
type LayoutContext = {
  data: string;
  setdata: React.Dispatch<React.SetStateAction<string>>;
};

export default function FoodsWrapper() {
  // Get data from Layout via Outlet context
  const { data } = useOutletContext<LayoutContext>();

  return <Foods data={data} />;
}

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Child routes get rendered here */}
    </>
  );
};

export default Layout;

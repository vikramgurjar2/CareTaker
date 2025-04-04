import React from "react";
import MobileSidebar from "./mobileSidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 md:p-0">
      <MobileSidebar />
    </div>
  );
};

export default Navbar;

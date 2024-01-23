import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const HomeIndex = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="px-3 lg:px-10 xl:px-20 pt-12">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeIndex;

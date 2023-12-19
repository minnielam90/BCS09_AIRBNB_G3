import React from "react";
import HomePages from "../pages/Home/HomePages";
import HomeIndex from "../layout/HomeIndex";

export const userRoute = {
  home: {
    path: "/",
    element: (
      <HomeIndex>
        <HomePages />
      </HomeIndex>
    ),
  },
};

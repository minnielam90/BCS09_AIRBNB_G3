import React from "react";
import HomePages from "../layout/HomePages";
import HomeUser from "../pages/Home/HomeUser";

export const userRoute = {
  home: {
    path: "/",
    element: (
      <HomePages>
        <HomeUser />
      </HomePages>
    ),
  },
};
